import React, { Component } from 'react';
import './ActivityLog.css';

const entries = [
  { id: 1, name: "Entry 1"},
  { id: 2, name: "Entry 2"},
];

class ActivityLog extends Component {
  render() {
    return (
      <section className="ActivityLog">
        <h1>ActivityLog</h1>
        <div className="entries">
          {entries.map((entry) =>
            <div
              className="Entry"
              key={entry.id}
            >
              {entry.id}
              {' - '}
              {entry.name}
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default ActivityLog;
