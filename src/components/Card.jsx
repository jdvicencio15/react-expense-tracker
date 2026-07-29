function Card({
  title,
  icon,
  amount,
  description
}) {
  return (
    <div
      className="
        group
        bg-white
        dark:bg-slate-800
        rounded-2xl
        border
        border-gray-100
        dark:border-slate-700
        shadow-md
        dark:shadow-slate-900/50
        p-6
        hover:-translate-y-1
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">

        <h3
          className="
            text-sm
            font-semibold
            text-gray-500
            dark:text-gray-400
            uppercase
            tracking-wide
          "
        >
          {title}
        </h3>

        <div
          className="
            bg-blue-50
            dark:bg-blue-900/30
            p-3
            rounded-xl
            transition-all
            duration-300
            group-hover:bg-blue-100
            dark:group-hover:bg-blue-800/40
            group-hover:scale-110
          "
        >
          {icon}
        </div>

      </div>

      <h2
        className="
          mt-5
          text-3xl
          font-bold
          tracking-tight
          text-gray-800
          dark:text-white
        "
      >
        {amount}
      </h2>

      <p
        className="
          mt-2
          text-sm
          text-gray-500
          dark:text-gray-400
        "
      >
        {description}
      </p>

    </div>
  );
}

export default Card;