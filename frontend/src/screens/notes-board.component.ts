// @ts-nocheck -- generated from the approved design under its plain-JavaScript contract; not hand-written TypeScript.

import { Component, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ScreenBase } from "@/lib/screen-base";
import { UI_KIT } from "@/lib/ui";
import { apiFetch } from "@/lib/api";
const template = `
<style>
  .nb-in { animation: nb-in 180ms ease-out both; }
  @keyframes nb-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
  .nb-open { animation: nb-open 160ms ease-out both; }
  @keyframes nb-open { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { .nb-in, .nb-open { animation: none; } }
</style>

<div class="bg-white pb-16" [style.color]="brand.primaryColor" [style.font-family]="brand.fontBody">

  <!-- ROW 1 -->
  <div data-wf="b-0-0" class="flex flex-wrap items-end justify-between gap-3 pb-4" [style.border-bottom]="'2px solid ' + brand.primaryColor">
    <div>
      <p class="text-[11px] font-bold uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Public board &middot; open access</p>
      <h1 class="mt-1 text-3xl font-bold tracking-tight" [style.font-family]="brand.fontHeading">Shared notes board</h1>
    </div>
    <p class="text-[11px] font-bold uppercase tracking-[0.14em] tabular-nums" [style.color]="brand.neutralColor">
      {{ notes().length }} notes &middot; loaded {{ loadedAt }}
    </p>
  </div>

  <!-- ROW 2 -->
  <div data-wf="b-1-0" class="py-4">
    <p class="max-w-[68ch] text-[13px] leading-relaxed">Anyone can post, edit or delete any note here &mdash; no sign-in needed. Reload the page to see changes made by other visitors.</p>
    <p class="mt-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">
      <ui-icon name="Clock" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
      <span class="tabular-nums">Showing the board as it stood at {{ loadedAt }}. No live sync.</span>
    </p>
  </div>

  <!-- ROW 3 + ROW 4 -->
  <form data-wf="b-2-0" (ngSubmit)="postNote()" class="p-4" [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius">
    <h2 class="text-[11px] font-bold uppercase tracking-[0.18em]" [style.font-family]="brand.fontHeading">New note</h2>
    <hr class="mt-2 mb-4 border-0" [style.border-top]="'2px solid ' + brand.primaryColor" />

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-4">
        <label for="new-title" class="block text-[11px] font-bold uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">Title (optional)</label>
        <input id="new-title" name="newTitle" data-wf="i-2-0-0" [(ngModel)]="newTitle" maxlength="80"
          class="mt-1 h-9 w-full bg-white px-3 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor"
          placeholder="e.g. Office Wi-Fi" />
      </div>
      <div class="col-span-12 md:col-span-8">
        <label for="new-body" class="block text-[11px] font-bold uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">Note text (required, plain text only)</label>
        <textarea id="new-body" name="newBody" data-wf="i-2-0-1" rows="3" [(ngModel)]="newBody"
          [attr.aria-invalid]="newError() ? 'true' : null" aria-describedby="new-note-help"
          class="mt-1 w-full bg-white px-3 py-2 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          [style.border]="newError() ? '2px solid ' + brand.accentColor : '2px solid ' + brand.primaryColor"
          [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor"
          placeholder="Plain text only. Formatting, files and tags are not stored."></textarea>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-12 items-center gap-4">
      <div class="col-span-12 md:col-span-3">
        <button data-wf="b-3-0" type="submit"
          class="h-10 w-full px-4 text-xs font-bold uppercase tracking-[0.14em] text-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          [style.background-color]="brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Post note</button>
      </div>
      <div data-wf="b-3-1" id="new-note-help" class="col-span-12 md:col-span-9 text-[13px]">
        @if (newError()) {
          <p class="flex items-center gap-2 font-bold" role="alert" [style.color]="brand.accentColor">
            <ui-icon name="AlertCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
            <span>Note text is required &mdash; an empty note cannot be posted.</span>
          </p>
        } @else if (postedTitle()) {
          <p class="flex items-center gap-2 font-semibold" role="status">
            <ui-icon name="CheckCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
            <span>Posted &ldquo;{{ postedTitle() }}&rdquo; to the board. Everyone sees it on their next reload.</span>
          </p>
        } @else {
          <p [style.color]="brand.neutralColor">Note text is required &mdash; an empty note cannot be posted.</p>
        }
      </div>
    </div>
  </form>

  <!-- ROW 5 -->
  <section data-wf="b-4-0" class="mt-8">
    <div class="flex flex-wrap items-baseline justify-between gap-2 pb-2" [style.border-bottom]="'2px solid ' + brand.primaryColor">
      <h2 class="text-sm font-bold uppercase tracking-[0.14em] tabular-nums" [style.font-family]="brand.fontHeading">Notes on the board ({{ notes().length }})</h2>
      <p class="text-[11px] font-bold uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">Wiki-style &mdash; any note can be edited or deleted</p>
    </div>

    @switch (boardState()) {
      @case ('loading') {
        <ul class="list-none">
          @for (slot of skeletons; track slot) {
            <li class="flex items-center gap-4 py-3" [style.border-bottom]="'1px solid ' + hair">
              <span class="h-3 w-40 animate-pulse" [style.background-color]="tint"></span>
              <span class="h-3 flex-1 animate-pulse" [style.background-color]="tint"></span>
            </li>
          }
        </ul>
        <p class="py-3 text-[11px] font-bold uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">Fetching the board&hellip;</p>
      }
      @case ('error') {
        <div class="my-4 p-4" [style.border]="'2px solid ' + brand.accentColor" [style.border-radius]="brand.radius">
          <p class="flex items-center gap-2 text-sm font-bold" [style.color]="brand.accentColor">
            <ui-icon name="AlertCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
            <span>The board did not load</span>
          </p>
          <p class="mt-1 max-w-[62ch] text-[13px]">The notes service did not answer. Nothing you typed above has been lost &mdash; your draft is still in the form.</p>
          <button type="button" (click)="retryBoard()"
            class="mt-3 h-9 px-4 text-xs font-bold uppercase tracking-[0.14em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Load the board again</button>
        </div>
      }
      @default {
        @if (notes().length) {
          <ul class="list-none">
            @for (note of notes(); track note.id; let i = $index) {
              <li class="nb-in" [style.border-bottom]="'1px solid ' + hair" [style.background-color]="note.id === selectedId() ? tint : null">
                <button type="button" [attr.data-wf]="'i-4-0-' + i" (click)="select(note.id)" [attr.aria-current]="note.id === selectedId() ? 'true' : null"
                  class="flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 px-2 py-3 text-left hover:bg-black/[0.03] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
                  [style.outline-color]="brand.accentColor">
                  <span class="text-[13px] font-bold">{{ note.title || '(No title)' }}</span>
                  <span class="text-[13px]" [style.color]="brand.neutralColor">&mdash; {{ note.body }}</span>
                  <span class="ml-auto flex items-center gap-2 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em] tabular-nums" [style.color]="brand.neutralColor">
                    @if (note.reported) {
                      <span class="flex items-center gap-1" [style.color]="brand.accentColor">
                        <ui-icon name="AlertCircle" class="h-3.5 w-3.5" aria-hidden="true"></ui-icon>
                        Reported
                      </span>
                    }
                    {{ stampLabel(note) }}
                  </span>
                </button>
              </li>
            }
          </ul>
        }
      }
    }
  </section>

  <!-- ROW 6 -->
  <div data-wf="b-5-0" class="mt-6 p-4" [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius">
    @if (selected()) {
      <h3 class="text-lg font-bold tracking-tight" [style.font-family]="brand.fontHeading">{{ selected().title || '(No title)' }}</h3>
      <p class="mt-2 max-w-[70ch] whitespace-pre-line text-sm leading-relaxed">{{ selected().body }}</p>
      <p class="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] tabular-nums" [style.color]="brand.neutralColor">{{ stampLabel(selected()) }} &middot; note {{ selected().id }}</p>
    } @else {
      <p class="text-[13px] font-semibold">No note is open.</p>
      <p class="mt-1 text-[13px]" [style.color]="brand.neutralColor">Choose a note from the list above to read it in full, then edit, delete or report it.</p>
    }
  </div>

  <!-- ROW 7 -->
  <div class="mt-4 grid grid-cols-12 items-center gap-4">
    <div class="col-span-6 md:col-span-3">
      <button data-wf="b-6-0" type="button" [disabled]="!selected()" (click)="startEdit()"
        class="h-9 w-full px-4 text-xs font-bold uppercase tracking-[0.14em] disabled:opacity-30 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Edit note</button>
    </div>
    <div class="col-span-6 md:col-span-3">
      <button data-wf="b-6-1" type="button" [disabled]="!selected()" (click)="askDelete()"
        class="h-9 w-full px-4 text-xs font-bold uppercase tracking-[0.14em] disabled:opacity-30 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Delete note</button>
    </div>
    <div class="col-span-6 md:col-span-3">
      <button data-wf="b-6-2" type="button" [disabled]="!selected()" (click)="reportNote()"
        class="h-9 w-full px-4 text-xs font-bold uppercase tracking-[0.14em] disabled:opacity-30 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Report note</button>
    </div>
    <p data-wf="b-6-3" class="col-span-6 md:col-span-3 text-[13px] font-bold tabular-nums">
      @if (selected() && selected().report_count > 0) {
        <span class="flex items-center gap-2" [style.color]="brand.accentColor">
          <ui-icon name="AlertCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
          <span>Reported {{ selected().report_count }} {{ selected().report_count === 1 ? 'time' : 'times' }}</span>
        </span>
      } @else if (selected()) {
        <span class="font-semibold" [style.color]="brand.neutralColor">No reports on this note</span>
      } @else {
        <span class="font-semibold" [style.color]="brand.neutralColor">Open a note to act on it</span>
      }
    </p>
  </div>

  <!-- ROW 8 + ROW 9 -->
  @if (editing()) {
    <form data-wf="b-7-0" class="nb-panel mt-6 p-4" (ngSubmit)="saveEdit()" [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius">
      <h2 class="text-[11px] font-bold uppercase tracking-[0.18em]" [style.font-family]="brand.fontHeading">Editing: {{ editing().title || '(No title)' }}</h2>
      <hr class="mt-2 mb-4 border-0" [style.border-top]="'2px solid ' + brand.primaryColor" />

      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-4">
          <label for="edit-title" class="block text-[11px] font-bold uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">Title (optional)</label>
          <input id="edit-title" name="editTitle" data-wf="i-7-0-0" [(ngModel)]="editTitle" maxlength="80"
            class="mt-1 h-9 w-full bg-white px-3 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor" />
        </div>
        <div class="col-span-12 md:col-span-8">
          <label for="edit-body" class="block text-[11px] font-bold uppercase tracking-[0.14em]" [style.color]="brand.neutralColor">Note text (required)</label>
          <textarea id="edit-body" name="editBody" data-wf="i-7-0-1" rows="3" [(ngModel)]="editBody"
            [attr.aria-invalid]="editError() ? 'true' : null" aria-describedby="edit-note-help"
            class="mt-1 w-full bg-white px-3 py-2 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.border]="editError() ? '2px solid ' + brand.accentColor : '2px solid ' + brand.primaryColor"
            [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor"></textarea>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-12 items-center gap-4">
        <div class="col-span-6 md:col-span-3">
          <button data-wf="b-8-0" type="submit"
            class="h-9 w-full px-4 text-xs font-bold uppercase tracking-[0.14em] text-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.background-color]="brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Save changes</button>
        </div>
        <div class="col-span-6 md:col-span-3">
          <button data-wf="b-8-1" type="button" (click)="cancelEdit()"
            class="h-9 w-full px-4 text-xs font-bold uppercase tracking-[0.14em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Cancel</button>
        </div>
        <div data-wf="b-8-2" id="edit-note-help" class="col-span-12 md:col-span-6 text-[13px]">
          @if (editError()) {
            <p class="flex items-center gap-2 font-bold" role="alert" [style.color]="brand.accentColor">
              <ui-icon name="AlertCircle" class="h-4 w-4" aria-hidden="true"></ui-icon>
              <span>Note text is required. Saved edits replace the note for everyone &mdash; no version history or undo.</span>
            </p>
          } @else {
            <p [style.color]="brand.neutralColor">Note text is required. Saved edits replace the note for everyone &mdash; no version history or undo.</p>
          }
        </div>
      </div>
    </form>
  } @else {
    <div data-wf="b-7-0" class="mt-6 p-4" [style.border]="'2px solid ' + hair" [style.border-radius]="brand.radius">
      <p class="text-[11px] font-bold uppercase tracking-[0.18em]" [style.color]="brand.neutralColor">Editing</p>
      <p class="mt-1 text-[13px]">No note is open for editing. Choose <span class="font-bold">Edit note</span> above to change a note for everyone on the board.</p>
    </div>
  }

  <!-- ROW 10 -->
  @if (boardState() === 'ready' && notes().length === 0) {
    <div data-wf="b-9-0" class="nb-panel mt-8 p-2" [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius">
      <ui-empty title="No notes yet" description="No notes yet — use the form above to post the first note on the board."></ui-empty>
    </div>
  }

  <!-- ROW 11 -->
  @if (confirmId()) {
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" (keydown.escape)="cancelDelete()">
      <div data-wf="b-10-0" role="dialog" aria-modal="true" aria-labelledby="del-title" tabindex="-1"
        class="nb-panel w-full max-w-md bg-white p-5 shadow-lg" [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius">
        <h2 id="del-title" class="text-base font-bold tracking-tight" [style.font-family]="brand.fontHeading">Delete this note permanently? This cannot be undone.</h2>
        <p class="mt-2 text-[13px]" [style.color]="brand.neutralColor">&ldquo;{{ confirmTitle() }}&rdquo; will disappear from the shared board for every visitor. There is no undo.</p>
        <div class="mt-5 flex justify-end gap-3">
          <button data-wf="i-10-0-0" type="button" (click)="cancelDelete()"
            class="h-9 px-4 text-xs font-bold uppercase tracking-[0.14em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Cancel</button>
          <button data-wf="i-10-0-1" type="button" (click)="confirmDelete()"
            class="h-9 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.background-color]="brand.accentColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.primaryColor">Delete note</button>
        </div>
      </div>
    </div>
  }

  @if (reportAck()) {
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" (keydown.escape)="closeReport()">
      <div data-wf="b-10-1" role="dialog" aria-modal="true" aria-labelledby="rep-title" tabindex="-1"
        class="nb-panel w-full max-w-md bg-white p-5 shadow-lg" [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius">
        <h2 id="rep-title" class="flex items-center gap-2 text-base font-bold tracking-tight" [style.font-family]="brand.fontHeading">
          <ui-icon name="CheckCircle" class="h-5 w-5" aria-hidden="true"></ui-icon>
          <span>Thanks &mdash; this note has been reported for review.</span>
        </h2>
        <p class="mt-2 text-[13px] tabular-nums" [style.color]="brand.neutralColor">&ldquo;{{ reportAck() }}&rdquo; is now flagged for the moderators. No sign-in or personal details were needed to report it.</p>
        <div class="mt-5 flex flex-wrap justify-end gap-3">
          <button data-wf="i-10-1-0" type="button" (click)="closeReport()"
            class="h-9 px-4 text-xs font-bold uppercase tracking-[0.14em] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.border]="'2px solid ' + brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Close</button>
          <button data-wf="i-10-1-1" type="button" (click)="escalate()"
            class="h-9 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            [style.background-color]="brand.primaryColor" [style.border-radius]="brand.radius" [style.outline-color]="brand.accentColor">Escalate to the grievance officer</button>
        </div>
      </div>
    </div>
  }
</div>
`;

@Component({
  selector: "app-notes-board-screen",
  imports: [...UI_KIT, FormsModule],
  template,
})
export default class Screen extends ScreenBase {
  loadedAt = "6 Nov 2026, 14:20";
  stamp = "6 Nov 2026, 14:22";
  hair = "color-mix(in srgb, #111111 16%, transparent)";
  tint = "color-mix(in srgb, #111111 6%, transparent)";
  skeletons = ["s1", "s2", "s3"];

  boardState = signal("loading");

  notes = signal([]);

  selectedId = signal(null);
  newTitle = signal("");
  newBody = signal("");
  newError = signal(false);
  postedTitle = signal("");

  editingId = signal(null);
  editTitle = signal("");
  editBody = signal("");
  editError = signal(false);

  confirmId = signal(null);
  reportAck = signal("");

  selected = computed(() => this.notes().find((n) => n.id === this.selectedId()) || null);
  editing = computed(() => this.notes().find((n) => n.id === this.editingId()) || null);
  confirmTitle = computed(() => {
    const note = this.notes().find((n) => n.id === this.confirmId());
    return note ? note.title || "(No title)" : "";
  });

  stampLabel(note) {
    return note.updated_at ? "Updated " + note.updated_at : "Created " + note.created_at;
  }

  ngOnInit() {
    this.loadBoard();
  }

  async loadBoard() {
    this.boardState.set("loading");
    try {
      const data = await apiFetch("/api/notes", undefined, { auth: false });
      this.notes.set(data || []);
      this.selectedId.set(data && data.length ? data[0].id : null);
      this.boardState.set("ready");
    } catch {
      this.boardState.set("error");
    }
  }

  retryBoard() {
    this.loadBoard();
  }

  select(id) {
    this.selectedId.set(id);
  }

  async postNote() {
    const body = this.newBody().trim();
    if (!body) {
      this.newError.set(true);
      this.postedTitle.set("");
      return;
    }
    const title = this.newTitle().trim();
    const payload = title ? { title: title, body: body } : { body: body };
    try {
      const created = await apiFetch(
        "/api/notes",
        { method: "POST", body: JSON.stringify(payload) },
        { auth: false },
      );
      this.notes.set([created, ...this.notes()]);
      this.newTitle.set("");
      this.newBody.set("");
      this.newError.set(false);
      this.postedTitle.set(created.title || "(No title)");
      this.selectedId.set(created.id);
    } catch (e) {
      if (e && e.status === 400) {
        this.newError.set(true);
        this.postedTitle.set("");
      }
    }
  }

  startEdit() {
    const note = this.selected();
    if (!note) return;
    this.editingId.set(note.id);
    this.editTitle.set(note.title);
    this.editBody.set(note.body);
    this.editError.set(false);
  }

  saveEdit() {
    const body = this.editBody().trim();
    if (!body) {
      this.editError.set(true);
      return;
    }
    const id = this.editingId();
    const title = this.editTitle().trim();
    this.notes.set(
      this.notes().map((n) =>
        n.id === id ? { ...n, title: title, body: body, updated_at: this.stamp } : n,
      ),
    );
    this.editError.set(false);
    this.editingId.set(null);
    this.postedTitle.set("");
  }

  cancelEdit() {
    this.editingId.set(null);
    this.editError.set(false);
  }

  askDelete() {
    if (!this.selected()) return;
    this.confirmId.set(this.selectedId());
  }

  cancelDelete() {
    this.confirmId.set(null);
  }

  confirmDelete() {
    const id = this.confirmId();
    const left = this.notes().filter((n) => n.id !== id);
    this.notes.set(left);
    if (this.editingId() === id) this.cancelEdit();
    this.selectedId.set(left.length ? left[0].id : null);
    this.confirmId.set(null);
    this.postedTitle.set("");
  }

  reportNote() {
    const note = this.selected();
    if (!note) return;
    this.notes.set(
      this.notes().map((n) =>
        n.id === note.id ? { ...n, reported: true, report_count: n.report_count + 1 } : n,
      ),
    );
    this.reportAck.set(note.title || "(No title)");
  }

  closeReport() {
    this.reportAck.set("");
  }

  escalate() {
    this.reportAck.set("");
    this.navigate("grievance-contact");
  }
}
