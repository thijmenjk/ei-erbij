import { decreaseEggCount, eggCount, increaseEggCount } from "@/actions";
import { getUserId } from "@/utils";
import Image from "next/image";
import { SubmitButton } from "./_components/submit-button";
const locale = "nl-NL";

export default async function Home() {
  const countMap = await eggCount();
  const cuid = getUserId();
  const date = new Date();

  const count = countMap ? Object.values(countMap).reduce((a, b) => a + b, 0) : 0;
  const peopleCount = countMap ? Object.keys(countMap).length : 0;

  return (<>
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-4">
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-6xl font-bold">{date.toLocaleString(locale, { weekday: 'long' })}</h1>
            <h2 className="text-xl">{date.toLocaleDateString(locale)}</h2>

            {count > 0 ?
              (<p>in totaal {count} eitje{count > 1 ? 's' : ''} voor {peopleCount} {peopleCount > 1 ? 'personen' : 'persoon'}</p>) :
              (<p>nog geen eitjes opgegeven</p>)
            }

            <div className="flex gap-2">
              <form action={decreaseEggCount}>
                <SubmitButton>
                  -
                </SubmitButton>
              </form>
              <div className="w-[100px] text-center font-bold py-2 px-4 rounded">
                {cuid && countMap ? countMap[cuid] || 0 : 0}
              </div>
              <form action={increaseEggCount}>
                <SubmitButton>
                  +
                </SubmitButton>
              </form>
            </div>

            <div className="flex justify-center gap-5 flex-wrap max-w-xl">
              {countMap && Object.keys(countMap).sort().map(
                (uid) => (
                  Array.from({ length: countMap[uid] }, (_, i) => (
                    <Image
                      key={i}
                      width={96}
                      height={96}
                      alt="Ei"
                      className={`${uid === cuid ? "animate-bounce" : ""}`}
                      src="egg.svg"
                    />
                  ))
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  </>);
}
