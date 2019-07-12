export interface Project {
    mainImage: string;
    title: string;
    images: string[];
    description: string | JSX.Element;
    buttons?: { [ key: string ]: string; };
}
