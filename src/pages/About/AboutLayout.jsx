// src/pages/About/AboutLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const BRAND = "#07518a";

export default function AboutLayout() {
  const base = "px-3 py-1.5 rounded-md text-sm font-medium transition-colors";
  const active = { background: BRAND, color: "#fff" };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4" style={{ color: BRAND }}>
        About
      </h1>

      {/* Sub navigation */}
      <nav className="flex flex-wrap gap-2 bg-slate-50 border rounded-lg p-2 mb-8">
        <NavLink
          end
          to=""
          className={base}
          style={({ isActive }) => (isActive ? active : undefined)}
        >
          Who we are
        </NavLink>
        <NavLink
          to="ourteam"
          className={base}
          style={({ isActive }) => (isActive ? active : undefined)}
        >
          Our team
        </NavLink>
        <NavLink
          to="board"
          className={base}
          style={({ isActive }) => (isActive ? active : undefined)}
        >
          Board
        </NavLink>
        <NavLink
          to="ourstory"
          className={base}
          style={({ isActive }) => (isActive ? active : undefined)}
        >
          Our story
        </NavLink>
        <NavLink
          to="careers"
          className={base}
          style={({ isActive }) => (isActive ? active : undefined)}
        >
          Careers
        </NavLink>
      </nav>

      {/* Child pages render here */}
      <Outlet />
    </main>
  );
}
