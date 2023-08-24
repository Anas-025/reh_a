function Testimonial({text, name, designation} : {text : string, name : string, designation : string}) {
  return (
    <div className="testimonial-container">
      <div className="testimonial">
        <div className="testimonial-text">
          “ {text} ”
        </div>
        <div className="testimonial-credentials">
          <div className="testimonial-avatar"></div>
          <div className="testimonial-name-container">
            <div className="testimonial-name">{name}</div>
            <div className="testimonial-reputation">{designation}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
