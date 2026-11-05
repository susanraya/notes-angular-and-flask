import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { vi } from "vitest";

import * as api from "@/lib/api";
import Screen from "./grievance-contact.component";

async function settle(fixture: ReturnType<typeof TestBed.createComponent>) {
  await fixture.whenStable();
  await fixture.whenStable();
  fixture.detectChanges();
}

const CONTACT = {
  grievance_officer: "Anjali Nair",
  email: "grievance@notesboard.in",
  phone: "+91 80 4000 1234",
  address: "Notes Board, 3rd Floor, MG Road, Bengaluru 560001, India",
  response_windows: { acknowledgement: "24 hrs", resolution: "15 days" },
};

describe("GrievanceContactScreen", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("[AC-019] loads officer name, email, phone, address and response windows from GET /api/grievance-contact with no auth", async () => {
    const fetchSpy = vi.spyOn(api, "apiFetch").mockResolvedValue(CONTACT);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    expect(fetchSpy).toHaveBeenCalledWith("/api/grievance-contact", undefined, { auth: false });
    const text = fixture.nativeElement.textContent;
    expect(text).toContain("Anjali Nair");
    expect(text).toContain("grievance@notesboard.in");
    expect(text).toContain("+91 80 4000 1234");
    expect(text).toContain("Notes Board, 3rd Floor, MG Road, Bengaluru 560001, India");
    expect(text).toContain("24 hrs");
    expect(text).toContain("15 days");
  });

  it("[AC-019] shows a loading state before the response resolves", async () => {
    let resolveFn: (v: unknown) => void;
    vi.spyOn(api, "apiFetch").mockReturnValue(
      new Promise((resolve) => {
        resolveFn = resolve;
      }),
    );
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain("Fetching contact details");

    resolveFn!(CONTACT);
    await settle(fixture);
    expect(fixture.nativeElement.textContent).toContain("Anjali Nair");
  });

  it("[AC-019] shows an error state with retry when the contact info fails to load", async () => {
    const fetchSpy = vi.spyOn(api, "apiFetch").mockRejectedValueOnce(new Error("boom"));
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("Contact details did not load");

    fetchSpy.mockResolvedValueOnce(CONTACT);
    const retryButton = Array.from(fixture.nativeElement.querySelectorAll("button")).find((b) =>
      (b as HTMLElement).textContent?.includes("Try again"),
    ) as HTMLElement;
    retryButton.click();
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain("Anjali Nair");
  });

  it("[AC-019] the in-screen back link to the notes board still works", async () => {
    vi.spyOn(api, "apiFetch").mockResolvedValue(CONTACT);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    const backButton = Array.from(fixture.nativeElement.querySelectorAll("button")).find((b) =>
      (b as HTMLElement).textContent?.includes("Back to the notes board"),
    ) as HTMLElement;
    expect(backButton).toBeTruthy();
  });

  it("[NFR-001] fetch is made with no auth and no sign-in or personal detail is requested", async () => {
    const fetchSpy = vi.spyOn(api, "apiFetch").mockResolvedValue(CONTACT);
    TestBed.configureTestingModule({ imports: [Screen], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(Screen);
    fixture.detectChanges();
    await settle(fixture);

    const call = fetchSpy.mock.calls.find((c) => c[0] === "/api/grievance-contact");
    expect(call?.[2]).toEqual({ auth: false });
    expect(fixture.nativeElement.querySelector("input[type=email]")).toBeNull();
    expect(fixture.nativeElement.querySelector("input[type=password]")).toBeNull();
  });
});
