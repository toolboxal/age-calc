/* eslint-disable react/prop-types */
const CalculatedPanel = ({ userTime }) => {
  const { calcDays, calcMonths, calcYears } = userTime;
  return (
    <div className="font-display mt-16 text-5xl italic md:text-7xl lg:text-8xl">
      <div className="flex items-center gap-3">
        <span className="inline-block text-center text-primary">
          {calcYears || "--"}
        </span>
        <p>{calcYears === 1 ? "year" : "years"}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-block text-center  text-primary">
          {calcMonths || "--"}
        </span>
        <p>{calcMonths === 1 ? "month" : "months"}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-block text-center  text-primary">
          {calcDays || "--"}
        </span>
        <p>{calcDays === 1 ? "day" : "days"}</p>
      </div>
    </div>
  );
};
export default CalculatedPanel;
