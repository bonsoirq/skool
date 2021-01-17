import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
  return <nav className="Navigation">
    <NavLink activeClassName="active" to={'/Courses'}>Kursy</NavLink>
    <NavLink activeClassName="active" to={'/Students'}>Kursanci</NavLink>
    <NavLink activeClassName="active" to={'/AdmissionCards'}>Karnety</NavLink>
    <NavLink activeClassName="active" to={'/AdvancementLevels'}>Poziomy zaawansowania</NavLink>
    <NavLink activeClassName="active" to={'/Groups'}>Grupy zajęciowe</NavLink>
    <NavLink activeClassName="active" to={'/Lessons'}>Zajęcia</NavLink>
  </nav>
}
