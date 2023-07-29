import services from "./Services.module.css";
import Service from "./Service";

function Services() {
  return (
    <div id="services" className={services.container}>
      <div className={services.title}>Services</div>
      <div className={services.grid}>
        <Service image="/secure.png" name="Secured" />
        <Service
          image="/online_consultancy.png"
          name="Online&nbsp;Consultancy"
        />
        <Service image="/video.png" name="Video&nbsp;Illustrations" />
        <Service image="/blogs.png" name="Blogs" />
        <Service image="/experts.png" name="&nbsp;&nbsp;&nbsp;Experts" />
        <Service image="/easy.png" name="Easy&nbsp;to&nbsp;use" />
      </div>
    </div>
  );
}

export default Services;
