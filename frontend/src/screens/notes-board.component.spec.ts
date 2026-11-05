import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { vi } from "vitest";

import * as api from "@/lib/api";
import Screen from "./notes-board.component";

async function settle(fixture: ReturnType<typeof TestBed.createComponent>) {
  await fixture.whenStable();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe("NotesBoardScreen", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("[AC-003] loads the board from GET /api/notes with no auth on init", async () => {
    const fetchSpy = vi
      .spyOn(api, "apiFetch")
      .mockResolvedValue([
        {
          id: "n-1",
          title: "Hello",
          body: "World",
          reported: false,
          report_count: 0,
          created_at: "now",
          updated_at: null,
        },
      ]);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    expect(fetchSpy).toHaveBeenCalledWith("/api/notes", undefined, { auth: false });
    expect(fixture.nativeElement.textContent).toContain("Hello");
  });

  it("[AC-003] shows the empty state when the board has no notes", async () => {
    vi.spyOn(api, "apiFetch").mockResolvedValue([]);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("No notes yet");
  });

  it("[AC-003] shows an error state with retry when the board fails to load", async () => {
    const fetchSpy = vi.spyOn(api, "apiFetch").mockRejectedValueOnce(new Error("boom"));
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("The board did not load");

    fetchSpy.mockResolvedValueOnce([]);
    const retryButton = Array.from(fixture.nativeElement.querySelectorAll("button")).find((b) =>
      (b as HTMLElement).textContent?.includes("Load the board again"),
    ) as HTMLElement;
    retryButton.click();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("No notes yet");
  });

  it("[AC-004][AC-005] posting a note with body calls POST /api/notes with no auth and shows the server response", async () => {
    vi.spyOn(api, "apiFetch").mockResolvedValueOnce([]);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    const postSpy = vi.spyOn(api, "apiFetch").mockResolvedValueOnce({
      id: "n-9",
      title: "A title",
      body: "Some text",
      reported: false,
      report_count: 0,
      created_at: "now",
      updated_at: null,
    });

    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    instance.newTitle.set("A title");
    instance.newBody.set("Some text");
    await instance.postNote();
    await settle(fixture);

    expect(postSpy).toHaveBeenCalledWith(
      "/api/notes",
      { method: "POST", body: JSON.stringify({ title: "A title", body: "Some text" }) },
      { auth: false },
    );
    expect(fixture.nativeElement.textContent).toContain("A title");
  });

  it("[AC-006] does not call the API and shows the required message for whitespace-only body", async () => {
    vi.spyOn(api, "apiFetch").mockResolvedValueOnce([]);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    const postSpy = vi.spyOn(api, "apiFetch");
    postSpy.mockClear();
    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    instance.newBody.set("   ");
    await instance.postNote();
    await settle(fixture);

    expect(postSpy).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain("Note text is required");
  });

  it("[AC-006] a 400 from the API surfaces the required-content message", async () => {
    vi.spyOn(api, "apiFetch").mockResolvedValueOnce([]);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    const error = new Error("content required") as Error & { status?: number };
    error.status = 400;
    vi.spyOn(api, "apiFetch").mockRejectedValueOnce(error);

    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    instance.newBody.set("Some text");
    await instance.postNote();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("Note text is required");
  });
});
