import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet, type Routes } from "@angular/router";

import { IconComponent } from "@/lib/ui";
import NotesBoardScreen from "@/screens/notes-board.component";
import GrievanceContactScreen from "@/screens/grievance-contact.component";

/** The app's menu, drawn around every screen except the ones routed outside it. */
@Component({
  selector: "app-shell",
  imports: [RouterLink, RouterLinkActive, RouterOutlet, IconComponent],
  template: `
    <div class="flex min-h-screen flex-col">
      <header
        class="border-b"
        style="background-color: var(--brand-surface); border-color: var(--brand-border)"
      >
        <div class="flex items-center gap-6 px-6 py-2">
          <p class="shrink-0 text-sm font-semibold" style="font-family: var(--brand-font-heading)">
            Notes Board
          </p>
        <nav aria-label="App menu" class="flex flex-wrap items-center gap-1">
          <a
            routerLink="/notes-board"
            routerLinkActive
            #link0="routerLinkActive"
            [class]="linkClass(link0.isActive)"
          >
            <ui-icon name="Home" [size]="16" />
            Notes board
          </a>
          <a
            routerLink="/grievance-contact"
            routerLinkActive
            #link1="routerLinkActive"
            [class]="linkClass(link1.isActive)"
          >
            Contact &amp; grievance
          </a>
        </nav>
        </div>
      </header>
      <main class="flex-1 overflow-auto">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppShellComponent {
  protected linkClass(active: boolean): string {
    return [
      "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
      active ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
    ].join(" ");
  }
}

// Screens shown before sign-in, or hidden from the menu, are routed outside it.
export const routes: Routes = [
  {
    path: "",
    component: AppShellComponent,
    children: [
      { path: "notes-board", component: NotesBoardScreen },
      { path: "grievance-contact", component: GrievanceContactScreen },
    ],
  },
  { path: "**", redirectTo: "/notes-board" },
];

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {}
