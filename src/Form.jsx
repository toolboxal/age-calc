import { useForm } from "react-hook-form";
import clsx from "clsx";
import { isFuture, isLeapYear, isLastDayOfMonth } from "date-fns";

const errorFutureDate = [
  {
    name: "day",
    type: "Must be in the past",
    message: "Must be in the past",
  },
  {
    name: "month",
    type: "manual",
    message: "Must be in the past",
  },
  {
    name: "year",
    type: "manual",
    message: "Must be in the past",
  },
];

// eslint-disable-next-line react/prop-types
const Form = ({ handleTime }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      day: "",
      month: "",
      year: "",
    },
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    const year = data.year;
    const month = data.month - 1;
    const day = data.day;
    const userDate = new Date(year, month, day);
    const checkIsFuture = isFuture(userDate);
    const checkLeapYear = isLeapYear(userDate);
    const checkIsValid = isLastDayOfMonth(userDate);
    if (checkIsFuture) {
      errorFutureDate.forEach(({ name, type, message }) => {
        setError(name, { type, message });
      });
    } else if (!checkLeapYear && month === 1 && day > 28) {
      setError("day", {
        type: "custom",
        message: "invalid day for Feb",
      });
    } else if (checkLeapYear && month === 1 && day > 29) {
      setError("day", {
        type: "custom",
        message: "leap year has only 29 days",
      });
    } else if (day === "31" && !checkIsValid) {
      setError("day", {
        type: "custom",
        message: "30th is last day of this month",
      });
    } else {
      handleTime(userDate);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-lightGrayGray relative flex gap-4 border-b-2 pb-14"
    >
      <div className="basis-1/3 lg:basis-1/4">
        <label htmlFor="day" className="cursor-pointer">
          <p
            className={clsx(
              "mb-1 text-xs font-bold tracking-widest text-darkGray",
              errors.day && "text-red-400",
            )}
          >
            DAY
          </p>
          <input
            type="text"
            id="day"
            placeholder="DD"
            maxLength={2}
            {...register("day", {
              required: "field required",
              min: {
                value: 1,
                message: "must be a valid day",
              },
              max: {
                value: 31,
                message: "must be a valid day",
              },
              pattern: {
                value: /[0-9][0-9]?/,
                message: "Wrong format, numbers only",
              },
            })}
            className={clsx(
              "mb-1 w-full rounded-lg border-2 border-lightGray px-4 py-3 text-xl font-bold tracking-wider placeholder:text-lightGray focus:border-primary focus:outline-none",
              errors.day && "border-red-400",
            )}
          />
        </label>
        <p className="h-12 text-wrap  text-sm font-light italic text-danger">
          {errors.day?.message}
        </p>
      </div>
      <div className="basis-1/3 lg:basis-1/4">
        <label htmlFor="month" className="cursor-pointer">
          <p
            className={clsx(
              "mb-1 text-xs font-bold tracking-widest text-darkGray",
              errors.day && "text-red-400",
            )}
          >
            MONTH
          </p>
          <input
            type="text"
            id="month"
            maxLength={2}
            placeholder="MM"
            {...register("month", {
              required: "field required",
              min: {
                value: 1,
                message: "must be a valid month",
              },
              max: {
                value: 12,
                message: "must be a valid month",
              },
              pattern: {
                value: /[0-9][0-9]?/,
                message: "Wrong format, numbers only",
              },
            })}
            className={clsx(
              "mb-1 w-full rounded-lg border-2 border-lightGray px-4 py-3 text-xl font-bold tracking-wider placeholder:text-lightGray focus:border-primary focus:outline-none",
              errors.day && "border-red-400",
            )}
          />
        </label>
        <p className="h-12 text-wrap text-sm font-light italic text-danger">
          {errors.month?.message}
        </p>
      </div>
      <div className="basis-1/3 lg:basis-1/4">
        <label htmlFor="year" className="cursor-pointer">
          <p
            className={clsx(
              "mb-1 text-xs font-bold tracking-widest text-darkGray",
              errors.day && "text-red-400",
            )}
          >
            YEAR
          </p>
          <input
            type="text"
            id="year"
            maxLength={4}
            placeholder="YYYY"
            {...register("year", {
              required: "field required",
              pattern: {
                value: /[0-9][0-9]?[0-9]?[0-9]?/,
                message: "Wrong format, numbers only",
              },
            })}
            className={clsx(
              "mb-1 w-full rounded-lg border-2 border-lightGray px-4 py-3 text-xl font-bold tracking-wider placeholder:text-lightGray focus:border-primary focus:outline-none",
              errors.day && "border-red-400",
            )}
          />
        </label>
        <p className="h-12 text-wrap text-sm font-light italic text-danger">
          {errors.year?.message}
        </p>
      </div>
      <button
        type="submit"
        className="absolute bottom-0 left-1/2  flex h-16 w-16 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-primary shadow-md ring-1 ring-lightGray ring-offset-2 focus:bg-black focus:shadow-2xl focus:ring-black md:h-24 md:w-24 lg:left-full lg:-translate-x-full"
      >
        <img src="/icon-arrow.svg" alt="button arrow" className="w1/2 h-1/2" />
      </button>
    </form>
  );
};
export default Form;
