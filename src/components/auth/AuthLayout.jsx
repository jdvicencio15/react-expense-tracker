import { Wallet } from "lucide-react";

function AuthLayout({
  title,
  subtitle,
  children
}) {

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-4
      bg-gradient-to-br
      from-blue-50
      via-white
      to-blue-100
      "
    >

      <div
        className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        "
      >

        {/* LOGO */}

        <div
          className="
          flex
          justify-center
          mb-5
          "
        >

          <div
            className="
            w-20
            h-20
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-indigo-600
            flex
            items-center
            justify-center
            shadow-lg
            "
          >

            <Wallet
              size={42}
              className="text-white"
            />

          </div>

        </div>


        {/* APP TITLE */}

        <h1
          className="
          text-center
          text-3xl
          font-bold
          text-slate-900
          "
        >
          AK's
          <br />
          Expense Tracker V1
        </h1>


        {/* SUBTITLE */}

        <p
          className="
          text-center
          mt-3
          text-sm
          text-gray-500
          "
        >
          {subtitle}
        </p>


        {/* PAGE TITLE */}

        <h2
          className="
          text-2xl
          font-bold
          mt-8
          mb-5
          text-blue-600
          "
        >
          {title}
        </h2>


        {/* LOGIN / REGISTER FORM */}

        {children}


      </div>

    </div>
  );
}


export default AuthLayout;