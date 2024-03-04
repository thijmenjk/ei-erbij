import { getEggsLeft, setEggsLeft } from "@/actions";
import { SubmitButton } from "../_components/submit-button";

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
              {eggsLeft <= 0 && <>er zijn geen eitjes meer over</>}
              {eggsLeft == 1 && <>er is nog maar één eitje over</>}
              {eggsLeft > 1 && <>er zijn nog {eggsLeft} eitjes over</>}.
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
