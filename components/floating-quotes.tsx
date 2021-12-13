import { useIsRTL } from "lib/hooks/useTranslation";
import { useEffect, useState } from "react";

interface quoteData {
    role: string;
    profile: string;
    quotes: string[];
}
interface quotes {
    [name: string]: quoteData;
}
interface quote {
    role?: string;
    profile?: string;
    quote: string;
}
interface Props {
    quotes: quotes;
}
function extractQuotesByPerson(quotes: quotes): quote[] {
    let quotesResult: quote[] = [];
    for (let userQuotes in quotes) {
        const quoteList = quotes[userQuotes].quotes.map((quote) => ({
            role: quotes[userQuotes].role,
            profile: quotes[userQuotes].profile,
            quote: quote,
        }));

        quotesResult = [...quotesResult, ...quoteList];
    }
    return quotesResult;
}
export default function RandomQuotes(props: Props) {
    const isRTL = useIsRTL();
    const quotes = extractQuotesByPerson(props.quotes);
    const _randomNumber = Math.floor(Math.random() * 100);
    const [randomNumber, setRandomNumber] = useState(_randomNumber);
    useEffect(() => {
        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            setRandomNumber(randomNumber);
        }, 15000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const idx = randomNumber % quotes.length;

    return (
        <div>
            <p>{quotes[idx].quote}</p>
            <style jsx>{`
                div {
                    padding: 2rem;
                }
                p {
                    color: var(--colors-subText);
                    word-break: normal;
                    font-size: 1.8rem;
                    font-style: italic;
                    animation: fadeInAndOut 15s linear infinite;
                    line-height: 2.5rem;
                    font-family: cursive;
                    position: relative;
                    padding-inline-start: 3rem;
                    min-height: 100px;
                    max-height: 200px;
                }

                p:before {
                    content: "„";
                    position: absolute;
                    font-size: 3em;
                    left: ${isRTL ? "100%" : 0};
                    top: -5px;
                    color: grey;
                    line-height: 0;
                }

                @keyframes fadeInAndOut {
                    0% {
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
