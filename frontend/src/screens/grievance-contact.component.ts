// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, signal, computed } from "@angular/core";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
import { apiFetch } from "@/lib/api";
const template = `
<style>
  @keyframes wfRise {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: none; }
  }
  .wf-in { animation: wfRise 320ms cubic-bezier(0.2, 0.7, 0.3, 1) both; }
  .wf-row { transition: background-color 140ms linear; }
  @media (prefers-reduced-motion: reduce) {
    .wf-in { animation: none !important; }
    .wf-row { transition: none !important; }
  }
</style>

<section class="min-h-full w-full"
         [style.background-color]="brand.backgroundColor"
         [style.color]="brand.primaryColor"
         [style.font-family]="brand.fontBody">
  <div class="mx-auto w-full max-w-5xl px-6 py-10 md:py-12">

    <!-- Row 1 -->
    <header data-wf="b-0-0" class="wf-in">
      <p class="text-[11px] font-medium uppercase tracking-[0.2em]" [style.color]="brand.neutralColor">
        Grievance redressal &middot; IT (Intermediary) Rules 2021
      </p>
      <h1 class="mt-3 text-[32px] md:text-[40px] font-bold leading-[1.08] tracking-tight"
          [style.font-family]="brand.fontHeading">Contact &amp; grievance information</h1>
      <div class="mt-5 flex items-stretch" aria-hidden="true">
        <span class="block h-[2px] w-16" [style.background-color]="brand.accentColor"></span>
        <span class="block h-[2px] flex-1" [style.background-color]="brand.primaryColor"></span>
      </div>
    </header>

    <!-- Row 2 -->
    <p data-wf="b-1-0"
       class="wf-in mt-6 max-w-[70ch] text-[15px] leading-[1.6]"
       style="animation-delay: 40ms"
       [style.color]="brand.neutralColor">
      Found a note you consider objectionable? Report it from the board or contact our grievance officer below. We respond in line with the IT (Intermediary) Rules 2021.
    </p>

    @switch (state()) {
      @case ('loading') {
        <div class="mt-8 grid grid-cols-12 gap-6" role="status" aria-live="polite">
          <div class="col-span-12 md:col-span-6">
            <div class="h-40 animate-pulse rounded-[var(--brand-radius)]" [style.background-color]="tint" [style.border]="'2px solid ' + brand.primaryColor"></div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="h-40 animate-pulse rounded-[var(--brand-radius)]" [style.background-color]="tint" [style.border]="'2px solid ' + brand.primaryColor"></div>
          </div>
        </div>
        <p class="mt-3 text-[11px] font-bold uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">Fetching contact details&hellip;</p>
      }
      @case ('error') {
        <div class="my-6 p-4" [style.border]="'2px solid ' + brand.accentColor" [style.border-radius]="brand.radius">
          <p class="flex items-center gap-2 text-sm font-bold" [style.color]="brand.accentColor">
            <ui-icon name="AlertCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
            <span>Contact details did not load</span>
          </p>
          <p class="mt-1 max-w-[62ch] text-[13px]">We could not reach the grievance-contact service just now.</p>
          <button type="button" (click)="retry()"
            class="mt-3 h-9 px-4 text-xs font-bold uppercase tracking-[0.14em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Try again</button>
        </div>
      }
      @default {
        <!-- Row 3 -->
        <div class="mt-8 grid grid-cols-12 gap-6">

          <div data-wf="b-2-0" class="wf-in col-span-12 md:col-span-6" style="animation-delay: 80ms">
            <div uiCard class="h-full border-0 bg-white shadow-none"
                 [style.border]="'2px solid ' + brand.primaryColor"
                 [style.border-radius]="brand.radius">
              <div uiCardHeader class="px-5 pt-5 pb-3">
                <h2 uiCardTitle class="text-[17px] font-bold leading-snug tracking-tight"
                    [style.font-family]="brand.fontHeading">Grievance Officer &mdash; {{ officerName() }}</h2>
                <p uiCardDescription class="mt-1 text-[13px]" [style.color]="brand.neutralColor">
                  Designated under Rule 3(2) for the Notes Board public wiki.
                </p>
              </div>
              <div uiCardContent class="px-5 pb-5">
                <div class="flex items-center gap-3 pb-4">
                  <ui-avatar [name]="officerName()"></ui-avatar>
                  <div>
                    <p class="text-[14px] font-semibold leading-tight">{{ officerName() }}</p>
                    <p class="text-[12px] leading-tight" [style.color]="brand.neutralColor">Grievance Officer</p>
                  </div>
                </div>
                <hr uiSeparator class="border-0 h-px" [style.background-color]="hairline" />
                <dl class="mt-4 space-y-3">
                  @for (fact of officerFacts(); track fact.key) {
                    <div class="flex items-baseline justify-between gap-4">
                      <dt class="text-[11px] uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">{{ fact.key }}</dt>
                      <dd class="text-[13px] font-medium text-right" style="font-variant-numeric: tabular-nums">{{ fact.value }}</dd>
                    </div>
                  }
                </dl>
              </div>
            </div>
          </div>

          <div data-wf="b-2-1" class="wf-in col-span-12 md:col-span-6" style="animation-delay: 120ms">
            <div uiCard class="h-full border-0 bg-white shadow-none"
                 [style.border]="'2px solid ' + brand.primaryColor"
                 [style.border-radius]="brand.radius">
              <div uiCardHeader class="px-5 pt-5 pb-3">
                <h2 uiCardTitle class="text-[17px] font-bold leading-snug tracking-tight"
                    [style.font-family]="brand.fontHeading">Acknowledged within {{ ackWindow() }}, resolved within {{ resolveWindow() }}</h2>
                <p uiCardDescription class="mt-1 text-[13px]" [style.color]="brand.neutralColor">
                  The same clock applies to reports raised with the Report button on a note.
                </p>
              </div>
              <div uiCardContent class="px-5 pb-5">
                <div class="grid grid-cols-2 gap-4" style="font-variant-numeric: tabular-nums">
                  <ui-stat label="Acknowledgement" [value]="ackWindow()" hint="From receipt of the complaint"></ui-stat>
                  <ui-stat label="Resolution" [value]="resolveWindow()" hint="Statutory maximum"></ui-stat>
                </div>
                <hr uiSeparator class="my-4 border-0 h-px" [style.background-color]="hairline" />
                <p class="text-[13px] leading-[1.6]" [style.color]="brand.neutralColor">
                  Write to us with the note title, or the first line of its text, so the note can be identified. There is no login and no personal detail is required to raise a grievance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 4 -->
        <section data-wf="b-3-0" class="wf-in mt-10" style="animation-delay: 160ms" aria-labelledby="reach-us-heading">
          <div class="flex items-end justify-between gap-4">
            <h2 id="reach-us-heading" class="text-[20px] font-bold tracking-tight"
                [style.font-family]="brand.fontHeading">How to reach us</h2>
          </div>
          <div class="mt-3 flex items-stretch" aria-hidden="true">
            <span class="block h-[2px] w-16" [style.background-color]="brand.accentColor"></span>
            <span class="block h-[2px] flex-1" [style.background-color]="brand.primaryColor"></span>
          </div>

          <ul class="mt-0">
            @for (channel of channels(); track channel.wf) {
              <li [attr.data-wf]="channel.wf"
                  class="wf-row grid grid-cols-12 gap-x-4 gap-y-1 py-4"
                  [style.border-bottom]="'1px solid ' + hairline">
                <div class="col-span-12 md:col-span-3">
                  <span class="text-[11px] font-medium uppercase tracking-[0.16em]" [style.color]="brand.neutralColor">{{ channel.label }}</span>
                </div>
                <div class="col-span-12 md:col-span-6">
                  <p class="text-[15px] leading-[1.5] font-medium" style="font-variant-numeric: tabular-nums">{{ channel.value }}</p>
                  <p class="mt-1 text-[12.5px] leading-[1.5]" [style.color]="brand.neutralColor">{{ channel.note }}</p>
                </div>
                <div class="col-span-12 md:col-span-3 flex md:justify-end items-start">
                  @if (channel.copyable) {
                    <button uiButton variant="secondary" size="sm" type="button"
                            class="rounded-none min-h-[36px]"
                            [style.border]="'1px solid ' + brand.primaryColor"
                            [style.border-radius]="brand.radius"
                            [style.outline-color]="brand.accentColor"
                            [attr.aria-label]="'Copy ' + channel.label.toLowerCase() + ' details'"
                            (click)="copy(channel.wf, channel.value)">
                      @if (copiedId() === channel.wf) {
                        <ui-icon name="Check" class="h-4 w-4" aria-hidden="true"></ui-icon>
                        <span class="ml-1.5 text-[12px] uppercase tracking-[0.12em]">Copied</span>
                      } @else {
                        <span class="text-[12px] uppercase tracking-[0.12em]">Copy</span>
                      }
                    </button>
                  } @else {
                    <span uiBadge class="rounded-none text-[11px] uppercase tracking-[0.12em]"
                          [style.border-radius]="brand.radius">India &middot; in force</span>
                  }
                </div>
              </li>
            }
          </ul>

          <p class="sr-only" role="status" aria-live="polite">{{ copyStatus() }}</p>

          @if (copyFailed()) {
            <p class="wf-in mt-3 flex items-start gap-2 text-[13px] leading-[1.5]" [style.color]="brand.accentColor">
              <ui-icon name="AlertCircle" class="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true"></ui-icon>
              <span>This browser blocked the clipboard. Select the line above and copy it by hand &mdash; the details stay on screen.</span>
            </p>
          } @else if (copiedId()) {
            <p class="mt-3 text-[13px]" [style.color]="brand.neutralColor">{{ copyStatus() }}</p>
          }
        </section>
      }
    }

    <!-- Row 5 -->
    <div class="mt-10 grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-4">
        <button uiButton data-wf="b-4-0" type="button"
                class="w-full rounded-none min-h-[44px] text-[13px] uppercase tracking-[0.14em]"
                [style.background-color]="brand.primaryColor"
                [style.color]="brand.backgroundColor"
                [style.border-radius]="brand.radius"
                [style.outline-color]="brand.accentColor"
                (click)="navigate('notes-board')">
          <ui-icon name="ArrowLeft" class="h-4 w-4" aria-hidden="true"></ui-icon>
          <span class="ml-2">Back to the notes board</span>
        </button>
      </div>
      <div class="col-span-12 md:col-span-8 flex items-center">
        <p class="text-[12.5px] leading-[1.6]" [style.color]="brand.neutralColor">
          Notes Board is an intermediary under Section 79 of the Information Technology Act, 2000. Notes are public, anonymous and editable by anyone.
        </p>
      </div>
    </div>

  </div>
</section>
`;

@Component({
  selector: "app-grievance-contact-screen",
  imports: [...UI_KIT],
  template,
})
export default class Screen extends ScreenBase {
  hairline = "rgba(17, 17, 17, 0.14)";
  tint = "color-mix(in srgb, #111111 6%, transparent)";

  state = signal("loading");
  contact = signal(null);

  officerName = computed(() => (this.contact() && this.contact().grievance_officer) || "");

  officerFacts = computed(() => {
    const c = this.contact() || {};
    return [
      { key: "Email", value: c.email || "" },
      { key: "Phone", value: c.phone || "" },
      { key: "Postal address", value: c.address || "" },
    ];
  });

  ackWindow = computed(() => {
    const c = this.contact();
    const w = c && c.response_windows;
    return (w && w.acknowledgement) || "";
  });

  resolveWindow = computed(() => {
    const c = this.contact();
    const w = c && c.response_windows;
    return (w && w.resolution) || "";
  });

  channels = computed(() => {
    const c = this.contact() || {};
    return [
      {
        wf: "i-3-0-0",
        label: "Email",
        value: c.email || "",
        note: "Fastest route. Quote the note title, or its first line, so we can find it.",
        copyable: true,
      },
      {
        wf: "i-3-0-1",
        label: "Phone",
        value: c.phone || "",
        note: "Calls outside office hours are returned the next working day.",
        copyable: true,
      },
      {
        wf: "i-3-0-2",
        label: "Post",
        value: c.address || "",
        note: "Written notices are acknowledged by email or phone if you include one.",
        copyable: true,
      },
      {
        wf: "i-3-0-3",
        label: "Data hosting",
        value: "Notes data is hosted on infrastructure located in India",
        note: "No accounts, no personal data collected from visitors.",
        copyable: false,
      },
    ];
  });

  copiedId = signal("");
  copyFailed = signal(false);

  copyStatus = computed(() => {
    const id = this.copiedId();
    if (!id) return "";
    const hit = this.channels().filter((c) => c.wf === id)[0];
    if (!hit) return "";
    return hit.label + " copied to the clipboard.";
  });

  ngOnInit() {
    this.load();
  }

  async load() {
    this.state.set("loading");
    try {
      const data = await apiFetch("/api/grievance-contact", undefined, { auth: false });
      this.contact.set(data || {});
      this.state.set("ready");
    } catch {
      this.state.set("error");
    }
  }

  retry() {
    this.load();
  }

  copy(id, value) {
    this.copyFailed.set(false);
    let clip = null;
    try {
      clip = window && window.navigator ? window.navigator.clipboard : null;
    } catch (e) {
      clip = null;
    }
    if (clip && clip.writeText) {
      clip.writeText(value).then(
        () => {
          this.copiedId.set(id);
          this.copyFailed.set(false);
        },
        () => {
          this.copiedId.set("");
          this.copyFailed.set(true);
        },
      );
    } else {
      this.copiedId.set("");
      this.copyFailed.set(true);
    }
  }
}
