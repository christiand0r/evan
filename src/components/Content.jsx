const Content = (props) => {
    const { content, customClass } = props;

    return (
        <div className={`evanhub-content mt-xxl mb-xxl ${customClass ?? ''}`} dangerouslySetInnerHTML={{ __html: content }} />
    );
}

export default Content;
