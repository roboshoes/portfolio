import classnames from "classnames";
import * as React from "react";

import { ImagePayload, loadImages } from "../services/loader";
import s from "./picture-list.scss";
import { DETAIL_TOP_PADDING, detailMinHeight } from "./detail";

interface ImageListState {
    images: SizedImage[];
    hidden: boolean;
}

interface ImageListProps {
    images: string[];
    width: number;
    top: number;
    collapse: boolean;
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

    private images: ImagePayload[] = [];

    constructor( props: ImageListProps ) {
        super( props );

        loadImages( props.images ).then( ( images: ImagePayload[] ) => {

            this.images = images;

            const sizedImages = images.map<SizedImage>( payload => ( {
                url: payload.url,
                width: this.props.width,
                height: this.calculateHeight( this.props.width - 40, payload.image ),
            } ) );

            this.setState( { images: sizedImages } );

            setTimeout( () => {
                this.setState( { hidden: false } );
            }, 200 );
        } );
    }

    componentWillReceiveProps( nextProps: ImageListProps ) {
        if ( nextProps.width && this.images.length > 0 ) {
            const sizedImages = this.images.map<SizedImage>( payload => ( {
                url: payload.url,
                width: this.props.width,
                height: this.calculateHeight( this.props.width - 40, payload.image ),
            } ) );

            this.setState( { images: sizedImages } );
        }
    }

    render() {
        const hidden = this.state.hidden || this.props.collapse;

        let offset = 0;

        const images: JSX.Element[] = this.state.images.map( ( payload: SizedImage, i: number ) => {
            const y = hidden ? 0 : offset;
            const z = hidden ? -100 - ( i * 50 ) : 0;

            offset += payload.height;

            return <img className={ classnames( s.image, s[ "image" + i ] ) }
                        src={ payload.url }
                        key={ i }
                        style={ { transform: `translate3d( 0, ${ y }px, ${ z }px )` } } />;
        } );

        if ( ! hidden ) {
            detailMinHeight.next( offset + this.props.top + DETAIL_TOP_PADDING );
        }

        return (
            <div className={ classnames( s.wrapper, { [ s.hidden ]: hidden } ) }
                 style={ { top: hidden ? 0 : this.props.top } }>
                { images }
            </div>
        );
    }

    private calculateHeight( width: number, image: HTMLImageElement ): number {
        const scale = width / image.width;
        return image.height * scale;
    }
}
