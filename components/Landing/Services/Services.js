import Service from "./Service";
import services from "./Services.module.css";

function Services() {
  return (
    <div id="services" className={services.container}>
      <div className={services.title}>Services</div>
      <div className={services.grid}>
        <Service image="/secure.svg" name="Secured" />
        <Service
          image="/consultancy.svg"
          name="Online&nbsp;Consultancy"
        />
        <Service image="/video.svg" name="Video&nbsp;Illustrations" />
        <Service image="/blog.svg" name="Blogs" />
        <Service image="/expert.svg" name="&nbsp;&nbsp;&nbsp;Experts" />
        <Service image="/easyToUse.svg" name="Easy&nbsp;to&nbsp;use" />
      </div>
    </div>
  );
}

export default Services;
