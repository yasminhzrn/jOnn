import { useState } from "react";
import "./App.css";
import backgroundImage from "./assets/flowerback.jpg";

type Person = {
  name: string;
  color: string;
};

type Availability = {
  [date: string]: string[];
};

const people = [
  {
    name: "Yasmin",
    color: "#fcc7d5",
  },
  {
    name: "Zara",
    color: "#b4e2c4",
  },
  {
    name: "Yuta",
    color: "#fff5d7",
  },
];

function getMonthsFromCurrentMonth() {
  const today = new Date(); //tells today date

  const months = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(
      today.getFullYear(), //gets the year of current date
      today.getMonth() + i, //gets month of current date
      1
    );

    const year = date.getFullYear();
    const monthIndex = date.getMonth();

    const monthName = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase();

    const daysInMonth = new Date(
      year,
      monthIndex + 1,
      0
    ).getDate();

    months.push({
      name: monthName,
      year: year,
      monthIndex: monthIndex,
      days: daysInMonth,
    });
  }

  return months;
}

const months = getMonthsFromCurrentMonth();

function App() {
  const [selectedPerson, setSelectedPerson] =
    useState<Person>(people[0]);

  const [availability, setAvailability] = 
    useState<Availability>({});

  function toggleDate(dateKey: string) {
    setAvailability((currentAvailability) => {
      const peopleForDate =
        currentAvailability[dateKey] || []; //check the date toggled if ada orang or empty

      const personAlreadySelected =
        peopleForDate.includes(selectedPerson.name); //tanya if the current person is in the list, produce bool

      let updatedPeople;

      if (personAlreadySelected) {
        updatedPeople = peopleForDate.filter( //filter fx go tru every name and ONLY KEEP names that pass condition
          (name) => name !== selectedPerson.name
        );
      } else {
        updatedPeople = [
          ...peopleForDate, //...is called spread operator which means take everything already inside this array and copy it here
          selectedPerson.name,
        ];
      }

      return {
        ...currentAvailability,
        [dateKey]: updatedPeople, //overwrites only the clicked date
      };
    });
  }

  function getDayBackground(dateKey: string) {
    const availablePeople =
      availability[dateKey] || [];

    if (availablePeople.length === 0) {
      return "#ffffff";
    }

    const colors = availablePeople
      .map((personName) => {
        return people.find(
          (person) => person.name === personName
        )?.color;
      })
      .filter(Boolean) as string[];

    if (colors.length === 1) {
      return colors[0];
    }

    const sectionSize = 100 / colors.length;

    const gradientSections = colors
      .map((color, index) => {
        const start = index * sectionSize;
        const end = (index + 1) * sectionSize;

        return `${color} ${start}% ${end}%`;
      })
      .join(", ");

    return `linear-gradient(
      135deg,
      ${gradientSections}
    )`;
  }

  return (
    <main className="page" style={{ backgroundImage: `url(${backgroundImage})` }}>

      <section className="member-card">
        <div>
          <h1>
            Members
          </h1>
        </div>
        <div className="people-list">
            {people.map((person) => (
              <button
                className={`person-button ${
                  selectedPerson.name === person.name
                    ? "selected"
                    : ""
                }`}
                key={person.name}
                onClick={() => setSelectedPerson(person)}
              >
                <span
                  className="person-icon"
                  style={{ backgroundColor: person.color }}
                />

                {person.name}
              </button>
            ))}

            <button className="add-person-button">
              + Add person
            </button>
        </div>
        <p className="editing-message">
          Editing <strong>{selectedPerson.name}</strong>
        </p>
      </section>

      <section className="calendar-card">

        <header className="header">
          <div className="title-row">
            <span className="calendar-icon">📅</span>

            <div>
              <h1>LETAK DESIGN jOnn</h1>
            </div>
          </div>
        </header>

        <section className="year">
          {months.map((month) => (
            <div className="month-row" key={month.name}>

              <span className="month-name">
                {month.name}
                <small>{month.year}</small>
              </span>

              <div className="days">
                {Array.from(
                  { length: month.days },
                  (_, index) => {
                    const day = index + 1;

                    const dateKey = `${month.year}-${String(
                      month.monthIndex + 1
                    ).padStart(2, "0")}-${String(day).padStart(
                      2,
                      "0"
                    )}`;

                    return (
                      <button
                        className="day"
                        key={dateKey}
                        onClick={() => toggleDate(dateKey)}
                        style={{
                          background:
                            getDayBackground(dateKey),
                        }}
                      >
                        {day}
                      </button>
                    );
                  }
                )}
              </div>

            </div>
          ))}
        </section>

      </section>

    </main>
  );
}

export default App;