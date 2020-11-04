function Info() {
  return (
    <div className="contact-info">
      <h6 className="contact-info-section">Email</h6>
      <a href="mailto:vjcliang@ucdavis.edu">vjcliang@ucdavis.edu</a>
      <h6 className="contact-info-section">LinkedIn</h6>
      <a href="https://www.linkedin.com/in/vanessaaleung/">vanessaaleung</a>
      <h6 className="contact-info-section">Medium</h6>
      <a href="https://medium.com/@vanessaaleung">@vanessaaleung</a>
      <h6 className="contact-info-section">Github</h6>
      <a href="https://github.com/vanessaaleung">vanessaaleung</a>
    </div>
  )
}

function Contact() {
  return (
    <div className="home">
      <h1>Contact</h1>
      <p>Open to new opportunities!</p>
      <Info />
    </div>
  );
}

export default Contact;
