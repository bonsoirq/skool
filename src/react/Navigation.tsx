import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return <nav>
    <Link to={'/'}>Courses</Link>
    <Link to={'/AdmissionCards'}>Admission Cards</Link>
    <Link to={'/AdvancementLevels'}>Advancement Levels</Link>
    <Link to={'/Students'}>Students</Link>
    <Link to={'/Groups'}>Groups</Link>
    <Link to={'/Lessons'}>Lessons</Link>
  </nav>
}
