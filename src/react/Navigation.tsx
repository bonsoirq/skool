import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
  return <nav className="Navigation">
    <NavLink activeClassName="active" to={'/Courses'}>Courses</NavLink>
    <NavLink activeClassName="active" to={'/Students'}>Students</NavLink>
    <NavLink activeClassName="active" to={'/AdmissionCards'}>Admission Cards</NavLink>
    <NavLink activeClassName="active" to={'/AdvancementLevels'}>Advancement Levels</NavLink>
    <NavLink activeClassName="active" to={'/Groups'}>Groups</NavLink>
    <NavLink activeClassName="active" to={'/Lessons'}>Lessons</NavLink>
  </nav>
}
