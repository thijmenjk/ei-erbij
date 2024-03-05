import { getEggsLeft, setEggsLeft } from "@/actions";
import { SubmitButton } from "../_components/submit-button";
import Link from "next/link";

const locale = "nl-NL";

export default async function Page() {
  const eggsLeft = await getEggsLeft();

  const date = new Date();

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-4">
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-6xl font-bold">
              {date.toLocaleString(locale, { weekday: "long" })}
            </h1>
            <h2 className="text-xl">{date.toLocaleDateString(locale)}</h2>
            <p>
              <Link href="/">terug</Link>
            </p>

            <div className="flex gap-2">
              <form action={setEggsLeft}>
                <input
                  type="number"
                  name="count"
                  min="0"
                  max="100"
                  defaultValue={eggsLeft} />
                <SubmitButton>opslaan</SubmitButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}
