import "./App.css";
import backgroundImage from "./assets/flowerback.jpg";

const people = [
  {
    name: "Yasmin",
    color: "#9b87f5",
  },
  {
    name: "Zara",
    color: "#73c991",
  },
  {
    name: "Yuta",
    color: "#f2c94c",
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
      days: daysInMonth,
    });
  }

  return months;
}

const months = getMonthsFromCurrentMonth();

function App() {
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
              <button className="person-button" key={person.name}>
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
                  (_, index) => (
                    <button
                      className="day"
                      key={index}
                    >
                      {index + 1}
                    </button>
                  )
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