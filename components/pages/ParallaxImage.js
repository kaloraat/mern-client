const ParallaxImage = ({
  url = "/images/bg5.jpeg",
  children,
  paddingtop = "100px",
  paddingBottom = "75px",
}) => {
  // console.log(url);
  return (
    <div
      className="container-fluid text-center parallaxImage"
      style={{
        backgroundImage: "url(" + url + ")",
        backgroundAttachment: "fixed",
        paddingTop: paddingtop,
        paddingBottom: paddingBottom,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        display: "block",
      }}
    >
      <div>{children}</div>
    </div>
  );
};

export default ParallaxImage;
