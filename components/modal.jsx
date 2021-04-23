import { ThemeContext, useBodyScroll, usePortal } from "lib/hooks";
import { useState, useContext, useEffect } from "react";

function ModalComponent({ open, setOpened, title, children, footer = null }) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`container ${open ? "opened" : "closed"}`}>
            <div className="modal-wrapper">
                <div className={`modal ${open ? "opened" : "closed"}`}>
                    {title && (
                        <div className="header">
                            <span className="title">{title}</span>
                            <a
                                className="close"
                                onClick={() => setOpened(false)}
                            >
                                ×
                            </a>
                        </div>
                    )}
                    <div className="body">{children}</div>
                    {footer && <div className="footer">{footer}</div>}
                </div>
            </div>

            <style jsx>{`
                .container {
                    transition: backdrop-filter 1s ease-in-out;
                    z-index: 10;
                    bottom: 0;
                    top: 0;
                    right: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    background-color: rgba(0, 0, 0, 0.6);
                }
                .container.opened {
                    position: fixed;
                    display: block;
                    backdrop-filter: blur(5px) grayscale(1);
                }
                .container.closed {
                    backdrop-filter: blur(0) grayscale(0);
                }
                .modal-wrapper {
                    position: absolute;
                    top: 30%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .modal {
                    width: 600px;
                    display: grid;
                    grid-template-rows: 6rem 1fr;
                    background-color: ${theme.modalBg};
                    border: 1px solid ${theme.decorations};
                    border-radius: 1rem;
                    padding: 1rem;
                    box-shadow: 0 0 10em -3em ${theme.decorations};
                    transform-origin: center;
                }
                @media screen and (max-width: 768px) and (orientation: portrait) {
                    .modal-wrapper {
                        left: 0;
                        right: 0;
                        top: 0;
                        transform: translate(0, 0);
                    }
                    .modal {
                        width: 100%;
                    }
                }
                .modal.opened {
                    transition: transform 0.5s ease-in;
                    transform: scale(1);
                }
                .modal.closed {
                    transition: transform 0.5s ease-in;
                    transform: scale(0);
                }

                .header {
                    display: grid;
                    grid-template-columns: 1fr 6rem;
                    border-bottom: 1px solid ${theme.decorations};
                }

                .title {
                    line-height: 6rem;
                    font-size: 3rem;
                    margin: 0;
                    padding: 0 1rem;
                }

                .body {
                    padding: 15px 1rem;
                    height: 100%;
                }
                .header .close {
                    font-size: 3rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    cursor: pointer;
                    color: ${theme.text};
                }
                .close:hover {
                    opacity: 0.8;
                    background-color: rgba(0, 0, 0, 0.1);
                    border-radius: 1rem;
                }
            `}</style>
        </div>
    );
}

function Modal({
    open,
    setOpened,
    refreshOnRender,
    title,
    children,
    footer = null,
    parentEl = null,
}) {
    // @ts-ignore
    if (!process.browser) return null;
    const [_, setScrollingOnBody] = useBodyScroll(!open);
    useEffect(() => {
        setScrollingOnBody(!open);
    }, [open]);
    const [root, setRoot] = useState(null);
    useEffect(() => {
        if (parentEl) {
            setRoot(parentEl);
        } else {
            const elm = document.querySelector("body");
            setRoot(elm);
        }
    }, []);
    if (!root) return null;

    const modal = (
        <ModalComponent
            open={open}
            setOpened={setOpened}
            title={title}
            footer={footer}
        >
            {children}
        </ModalComponent>
    );
    if (refreshOnRender) {
        return open ? usePortal(modal, root) : null;
    }
    return usePortal(modal, root);
}

export default Modal;
