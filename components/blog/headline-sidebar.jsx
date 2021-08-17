import { useScreenSize, useScrollObserver } from "lib/hooks";
import { useState } from "react";

function generateLinkMarkup($contentElement) {
    const headings = [...$contentElement.querySelectorAll("h2, h3")];
    const parsedHeadings = headings.map((heading) => {
        return {
            title: heading.innerText,
            depth: heading.nodeName.replace(/\D/g, "") - 1,
            id: heading.getAttribute("id"),
        };
    });
    return parsedHeadings;
}

function HeaderTitle({ header }) {
    const AnchorLink = <a href={`#${header.id}`}>{header.title}</a>;
    let title = <dt>{AnchorLink}</dt>;
    if (header.depth > 1) {
        title = <dd>{AnchorLink}</dd>;
    }
    return title;
}

export function HeadlineSidebar({ article }) {
    const scrollPercentage = useScrollObserver();
    const { isMobile } = useScreenSize();
    if (isMobile || !article) return <></>;
    const headers = generateLinkMarkup(article);
    const headings = headers.map((header) => (
        <HeaderTitle key={header.id} header={header} />
    ));

    return (
        <aside>
            <div className="container">
                <div>
                    <h5>Headlines</h5>
                    <dl>{headings}</dl>
                </div>
                <span className="line"></span>
            </div>
            <style jsx>{`
                .container {
                    position: sticky;
                    top: 9rem;
                    left: 0;
                    width: 20rem;
                    display: flex;
                    flex-direction: column;
                    margin-inline: 3rem;
                    scroll-margin-top: 7rem;
                }

                h5 {
                    margin-block-end: 2rem;
                }
                dl {
                    padding-inline-start: 1rem;
                }
                .line {
                    position: absolute;
                    width: 1px;
                    height: 90vh;
                    top: 0;
                    left: 100%;
                    background: rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                }
                .line::before {
                    content: "";
                    display: block;
                    left: 0;
                    top: 0;
                    height: ${scrollPercentage}%;
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0) 0%,
                        #ffffff 75%,
                        #ffffff 100%
                    );
                }
                .line::after {
                    content: "";
                    display: block;
                    position: absolute;
                    height: 15vh;
                    width: 100%;
                    top: ${scrollPercentage}%;
                    left: 0;
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0) 0%,
                        #ffffff 75%,
                        #ffffff 100%
                    );
                    animation: drop 7s 0s infinite;
                    animation-fill-mode: forwards;
                    animation-timing-function: cubic-bezier(0.8, 0.26, 0, 0.97);
                }
                @keyframes drop {
                    from {
                        top: ${scrollPercentage}%;
                        transform: translateY(-100%);
                    }

                    to {
                        top: 100%;
                        transform: translateY(0%);
                    }
                }
            `}</style>
            <style jsx global>{`
                dt {
                    font-size: 1.4rem;
                }
                dd {
                    font-size: 1.2rem;
                }
                dd,
                dt {
                    margin-block: 1rem;
                }
                dd a,
                dt a {
                    text-decoration: none;
                }
                dd a:hover,
                dt a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </aside>
    );
}