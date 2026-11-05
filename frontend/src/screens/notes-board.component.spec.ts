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
    const fetchSpy = vi.spyOn(api, "apiFetch").mockResolvedValue([
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

  it("[AC-008] displays every note's title and plain-text body, with a placeholder when a title is absent", async () => {
    vi.spyOn(api, "apiFetch").mockResolvedValue([
      {
        id: "n-1",
        title: "Groceries",
        body: "Buy milk and eggs",
        reported: false,
        report_count: 0,
        created_at: "now",
        updated_at: null,
      },
      {
        id: "n-2",
        title: "",
        body: "An untitled reminder",
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

    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Groceries");
    expect(text).toContain("Buy milk and eggs");
    expect(text).toContain("An untitled reminder");
    expect(text).toContain("(No title)");
    expect(text).toContain("Notes on the board (2)");
    expect(fixture.nativeElement.querySelectorAll("ul li").length).toBe(2);
  });

  it("[AC-009] shows the empty state, and renders no note items at all, when the board has no notes", async () => {
    vi.spyOn(api, "apiFetch").mockResolvedValue([]);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("No notes yet");
    expect(fixture.nativeElement.querySelectorAll("ul li").length).toBe(0);
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

  async function loadedScreen(initialNotes: unknown[]) {
    vi.spyOn(api, "apiFetch").mockResolvedValueOnce(initialNotes);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);
    return fixture;
  }

  const note = {
    id: "n-1",
    title: "Hello",
    body: "World",
    reported: false,
    report_count: 0,
    created_at: "now",
    updated_at: null,
  };

  it("[AC-010] saving an edit calls PUT /api/notes/{id} with no auth and shows the server's note", async () => {
    const fixture = await loadedScreen([note]);
    const putSpy = vi.spyOn(api, "apiFetch").mockResolvedValueOnce({
      ...note,
      title: "Updated",
      body: "New body",
      updated_at: "later",
    });

    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    instance.startEdit();
    instance.editTitle.set("Updated");
    instance.editBody.set("New body");
    await instance.saveEdit();
    await settle(fixture);

    expect(putSpy).toHaveBeenCalledWith(
      "/api/notes/n-1",
      { method: "PUT", body: JSON.stringify({ title: "Updated", body: "New body" }) },
      { auth: false },
    );
    expect(fixture.nativeElement.textContent).toContain("New body");
  });

  it("[AC-011] clearing the body blocks the save client-side and shows the required message", async () => {
    const fixture = await loadedScreen([note]);
    const putSpy = vi.spyOn(api, "apiFetch");
    putSpy.mockClear();

    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    instance.startEdit();
    instance.editBody.set("   ");
    await instance.saveEdit();
    await settle(fixture);

    expect(putSpy).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain("Note text is required");
  });

  it("[AC-011] a 400 from PUT shows the required message and leaves the note unchanged", async () => {
    const fixture = await loadedScreen([note]);
    const error = new Error("content required") as Error & { status?: number };
    error.status = 400;
    vi.spyOn(api, "apiFetch").mockRejectedValueOnce(error);

    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    instance.startEdit();
    instance.editBody.set("Some text");
    await instance.saveEdit();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("Note text is required");
    expect(fixture.nativeElement.textContent).toContain("World");
  });

  it("[AC-012] no undo, revision list, or previous-version UI appears after a save", async () => {
    const fixture = await loadedScreen([note]);
    vi.spyOn(api, "apiFetch").mockResolvedValueOnce({
      ...note,
      title: "Updated",
      body: "New body",
    });

    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    instance.startEdit();
    instance.editBody.set("New body");
    await instance.saveEdit();
    await settle(fixture);

    expect(fixture.nativeElement.textContent.toLowerCase()).not.toContain("undo");
    expect(fixture.nativeElement.textContent.toLowerCase()).not.toContain("history");
    expect(fixture.nativeElement.textContent.toLowerCase()).not.toContain("previous version");
  });

  it("[AC-013][AC-014] confirming delete calls DELETE /api/notes/{id}; cancel sends no request", async () => {
    const fixture = await loadedScreen([note]);
    const instance = fixture.componentInstance as InstanceType<typeof Screen>;

    instance.askDelete();
    await settle(fixture);
    const cancelSpy = vi.spyOn(api, "apiFetch");
    cancelSpy.mockClear();
    instance.cancelDelete();
    await settle(fixture);
    expect(cancelSpy).not.toHaveBeenCalled();

    instance.askDelete();
    const deleteSpy = vi.spyOn(api, "apiFetch").mockResolvedValueOnce(undefined);
    await instance.confirmDelete();
    await settle(fixture);

    expect(deleteSpy).toHaveBeenCalledWith("/api/notes/n-1", { method: "DELETE" }, { auth: false });
    expect(fixture.nativeElement.textContent).not.toContain("Hello");
  });

  it("[AC] a failing delete leaves an error visible", async () => {
    const fixture = await loadedScreen([note]);
    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    instance.askDelete();
    vi.spyOn(api, "apiFetch").mockRejectedValueOnce(new Error("boom"));
    await instance.confirmDelete();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("Could not delete this note");
    expect(fixture.nativeElement.textContent).toContain("Hello");
  });

  it("calls POST /api/notes/{id}/report and reflects the returned reported flag and count", async () => {
    const fixture = await loadedScreen([note]);
    const reportSpy = vi.spyOn(api, "apiFetch").mockResolvedValueOnce({
      ...note,
      reported: true,
      report_count: 1,
    });

    const instance = fixture.componentInstance as InstanceType<typeof Screen>;
    await instance.reportNote();
    await settle(fixture);

    expect(reportSpy).toHaveBeenCalledWith(
      "/api/notes/n-1/report",
      { method: "POST" },
      { auth: false },
    );
    expect(fixture.nativeElement.textContent).toContain("Reported 1 time");
  });

  it("[NFR-001] mutation calls carry no auth header, email, or personal field", async () => {
    const fixture = await loadedScreen([note]);
    const instance = fixture.componentInstance as InstanceType<typeof Screen>;

    const putSpy = vi.spyOn(api, "apiFetch").mockResolvedValueOnce({ ...note, body: "x" });
    instance.startEdit();
    instance.editBody.set("x");
    await instance.saveEdit();
    await settle(fixture);
    const call = putSpy.mock.calls.find((c) => c[0] === "/api/notes/n-1");
    expect(call?.[2]).toEqual({ auth: false });
    expect(call?.[1]?.body).not.toMatch(/email|password/i);
  });
});
