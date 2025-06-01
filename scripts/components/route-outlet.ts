import autobind from "autobind-decorator";
import normalizeWheel from "normalize-wheel";
import { LitElement, html, css, CSSResult, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { clamp } from "lodash";
import { fromEvent, Observable, Observer, Subscription } from "rxjs";

@customElement("app-route-outlet")
export class RouteOutletElement extends LitElement {
    private timeout = -1;
    private maskHeight = -1;
    private contentHeight = -1;
    private left?: HTMLDivElement;
    private right?: HTMLDivElement;
    private leftMover?: HTMLDivElement;
    private rightMover?: HTMLDivElement;
    private container?: HTMLDivElement;
    private primarySlot?: HTMLSlotElement;
    private targetOffset = 0;
    private leftOffset = 0;
    private rightOffset = 0;
    private raf = -1;
    private isScrollable = false;
    private isMasked = true;
    private subscription = new Subscription();
    private scrolledMode = false;

    static get styles(): CSSResult {
        return css`
            .container {
                position: relative;
                height: 100%;
            }

            .left,
            .right {
                box-sizing: border-box;
                height: 100%;
                transition: clip-path 1.7s ease-in-out;
                width: 100%;
            }

            .left {
                clip-path: polygon(1px 0%, calc(100% + 1px) 100%, 0% 100%);
            }

            .left.unmasked {
                clip-path: none;
            }

            .right {
                clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
            }

            .hide .right {
                clip-path: polygon(20% 0%, 100% 0%, 120% 100%);
            }

            .mover.animated {
                transition: transform 1.7s cubic-bezier(0.68, 0.04, 0.025, 1);
            }

            .hide .mover {
                transition: transform 1.7s cubic-bezier(0.97, 0.01, 0.55, 0.96);
            }

            .hide .right .mover {
                transform: translateX(-150%);
            }

            .hide .left .mover {
                transform: translateX(150%);
            }

            .wrapper {
                height: 100%;
                overflow: hidden;
                width: 100%;
                box-sizing: border-box;
                padding: 180px 200px;
            }

            @media (max-width: 500px) {
                .wrapper {
                    padding: 180px 50px;
                }
            }
        `;
    }

    firstUpdated(): void {
        this.primarySlot = this.shadowRoot!.querySelector(".left slot") as HTMLSlotElement;
        this.left = this.shadowRoot!.querySelector(".left") as HTMLDivElement;
        this.right = this.shadowRoot!.querySelector(".right") as HTMLDivElement;
        this.rightMover = this.shadowRoot!.querySelector(".right .mover") as HTMLDivElement;
        this.leftMover = this.shadowRoot!.querySelector(".left .mover") as HTMLDivElement;
        this.container = this.shadowRoot!.querySelector(".container") as HTMLDivElement;

        this.animateIn();

        this.subscription.add(fromEvent(window, "resize").subscribe(this.onResize));
        this.subscription.add(fromEvent(this.primarySlot, "slotchange").subscribe(this.updateSlotCopy));
        this.subscription.add(this.createTouchScrollObservable(this.container).subscribe(this.onScrollDelta));
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        clearTimeout(this.timeout);
        cancelAnimationFrame(this.raf);

        this.subscription.unsubscribe();
    }

    @autobind
    updateSlotCopy(): void {
        this.rightMover!.innerHTML = "";

        this.primarySlot!.assignedElements().forEach((node) => {
            this.rightMover!.appendChild(node.cloneNode(true));
        });

        this.onResize();
    }

    render(): TemplateResult {
        return html`
            <div class="container hide">
                <div class="left">
                    <div class="wrapper">
                        <div class="mover animated">
                            <slot></slot>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="wrapper">
                        <div class="mover animated"></div>
                    </div>
                </div>
            </div>
        `;
    }

    private createTouchScrollObservable(target: HTMLElement): Observable<number> {
        return new Observable((observer: Observer<number>) => {
            let latest = 0;

            function onTouchStart(event: TouchEvent): void {
                latest = event.touches[0].pageY;
            }

            function onTouchMove(event: TouchEvent): void {
                const delta = event.touches[0].pageY - latest;
                latest = event.touches[0].pageY;

                observer.next(delta);
            }

            target.addEventListener("touchstart", onTouchStart);
            target.addEventListener("touchmove", onTouchMove);

            return () => {
                target.removeEventListener("touchmove", onTouchMove);
                target.removeEventListener("touchstart", onTouchStart);
            };
        });
    }

    private animateIn(): void {
        this.container!.style.display = "";
        this.leftMover!.style.transform = "";
        this.rightMover!.style.transform = "";
        this.leftOffset = 0;
        this.rightOffset = 0;
        this.targetOffset = 0;

        this.timeout = setTimeout(() => {
            this.container!.classList.remove("hide");

            this.onResize();

            this.timeout = setTimeout(() => {
                this.leftMover!.classList.remove("animated");
                this.rightMover!.classList.remove("animated");

                this.loop();
                this.isScrollable = true;
            }, 1700);
        }, 100);
    }

    @autobind
    private onResize(): void {
        window.removeEventListener("wheel", this.onScrollEvent);
        window.addEventListener("wheel", this.onScrollEvent);

        const left = this.shadowRoot!.querySelector(".left .wrapper") as HTMLDivElement;

        this.maskHeight = left.getBoundingClientRect().height;
        this.contentHeight = this.leftMover!.getBoundingClientRect().height + 2 * 180;
    }

    @autobind
    private onScrollEvent(event: WheelEvent): void {
        this.onScrollDelta((normalizeWheel(event).pixelY * -1) / 4);
    }

    @autobind
    private onScrollDelta(delta: number): void {
        if (!this.isScrollable) {
            return;
        }

        const difference = Math.max(this.contentHeight - this.maskHeight + 20, 0);

        this.targetOffset += delta;
        this.targetOffset = clamp(this.targetOffset, -difference, 0);
    }

    @autobind
    private loop(): void {
        cancelAnimationFrame(this.raf);

        this.leftOffset += (this.targetOffset - this.leftOffset) / 5;
        this.rightOffset += (this.targetOffset - this.rightOffset) / 10;

        this.rightMover!.style.transform = `translateY( ${this.rightOffset}px )`;
        this.leftMover!.style.transform = `translateY( ${this.leftOffset}px )`;

        if (Math.abs(this.rightOffset - this.leftOffset) < 1 && this.isMasked) {
            this.left!.classList.add("unmasked");
            this.right!.style.display = "none";

            this.isMasked = false;
        } else if (Math.abs(this.rightOffset - this.leftOffset) >= 1 && !this.isMasked) {
            this.left!.classList.remove("unmasked");
            this.right!.style.display = "";

            this.isMasked = true;
        }

        if (this.leftOffset < -100 && this.scrolledMode === false) {
            this.scrolledMode = true;
            this.dispatchEvent(new CustomEvent("active", { composed: true, bubbles: true }));
        } else if (this.leftOffset > -100 && this.scrolledMode === true) {
            this.scrolledMode = false;
            this.dispatchEvent(new CustomEvent("idle", { composed: true, bubbles: true }));
        }

        this.raf = requestAnimationFrame(this.loop);
    }
}
