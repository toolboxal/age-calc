import { useState } from "react";
import CalculatedPanel from "./CalculatedPanel";
import Form from "./Form";

const initialState = {
  calcDays: "",
  calcMonths: "",
  calcYears: "",
};

function App() {
  const [userTime, setUserTime] = useState(initialState);
  const handleTime = (data) => {
    const timeElapsed = new Date() - data;
    const years = 365.25 * 24 * 60 * 60 * 1000;
    const days = 24 * 60 * 60 * 1000;
    const calcYears = parseInt(timeElapsed / years);
    let calcDays = parseInt((timeElapsed % years) / days);
    let calcMonths = 0;
    if (calcDays > 30) {
      calcMonths = parseInt(calcDays / 30);
      calcDays = calcDays % 30;
    }
    setUserTime((prev) => {
      return { ...prev, calcDays, calcMonths, calcYears };
    });
  };

  return (
    <main className="font-body flex h-screen items-center justify-center bg-lightGray">
      <article className="mx-4 w-full max-w-[840px]  rounded-t-3xl rounded-bl-3xl  rounded-br-[100px] bg-white px-6 py-12 md:rounded-br-[200px] lg:p-14">
        <Form handleTime={handleTime}></Form>
        <CalculatedPanel userTime={userTime}></CalculatedPanel>
      </article>
    </main>
  );
}

export default App;
