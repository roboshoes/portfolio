import classnames from "classnames";
import * as React from "react";

import { ImagePayload, loadImages } from "../services/loader";
import s from "./picture-list.scss";

interface ImageListState {
    images: SizedImage[];
    hidden: boolean;
}

interface ImageListProps {
    images: string[];
    width: number;
    top: number;
}

interface SizedImage {
    url: string;
    width: number;
    height: number;
}

export class ImageList extends React.Component<ImageListProps, ImageListState> {
    state = {
        hidden: true,
        images: [],
    };

    constructor( props: ImageListProps ) {
        super( props );

        loadImages( props.images ).then( ( images: ImagePayload[] ) => {

            const sizedImages = images.map<SizedImage>( payload => ( {
                url: payload.url,
                width: this.props.width,
                height: this.calculateHeight( this.props.width, payload.image ),
            } ) );

            this.setState( { images: sizedImages } );

            setTimeout( () => {
                this.setState( { hidden: false } );
            }, 200 );
        } );
    }

    render() {
        let offset = 0;

        return (
            <div className={ classnames( s.wrapper, { [ s.hidden ]: this.state.hidden } ) }
                 style={ { top: this.state.hidden ? 0 : this.props.top } }>
                {
                    this.state.images.map( ( payload: SizedImage, i: number ) => {
                        const y = this.state.hidden ? 0 : offset;
                        const z = this.state.hidden ? -100 - ( i * 50 ) : 0;

                        offset += payload.height + 20;

                    return <img className={ classnames( s.image, s[ "image" + i ] ) }
                                src={ payload.url }
                                key={ i }
                                style={ { transform: `translate3d( 0, ${ y }px, ${ z }px )` } } />;
                    } )
                }
            </div>
        );
    }

    private calculateHeight( width: number, image: HTMLImageElement ): number {
        const scale = width / image.width;
        return image.height * scale;
    }
}
