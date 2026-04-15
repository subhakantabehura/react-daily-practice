function CurrentYear() {
    // 4. Create a JSX element that displays the current year
    const currentYear = new Date().getFullYear();
    const element = <h1>The Current Year is {currentYear}</h1>;

    return element;
}

export default CurrentYear;