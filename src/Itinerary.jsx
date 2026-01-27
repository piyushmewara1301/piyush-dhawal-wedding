import React from "react";
import { motion } from "framer-motion";

const Itinerary = () => {
  const events = [
    {
      date: "9th February, 2026",
      items: [
        {
          time: "9:00 AM Onwards",
          title: "Welcome & Breakfast",
          venue: "Banquet Hall",
          image: `${process.env.PUBLIC_URL}/images/breakfast.jpeg`,
        },
        {
          time: "11:00 AM Onwards",
          title: "Carnival",
          venue: "Lawn 1",
          image: `${process.env.PUBLIC_URL}/images/carnival.jpeg`,
        },
        {
          time: "4:30 PM Onwards",
          title: "Hi-Tea",
          venue: "Banquet Hall",
          image: `${process.env.PUBLIC_URL}/images/hitea.jpeg`,
        },
        {
          time: "7:00 PM Onwards",
          title: "Sangeet",
          venue: "Lawn 2",
          image: `${process.env.PUBLIC_URL}/images/sangeet.jpeg`,
        },
      ],
    },
    {
      date: "10th February, 2026",
      items: [
        {
          time: "9:00 AM Onwards",
          title: "Breakfast",
          venue: "Banquet Hall",
          image: `${process.env.PUBLIC_URL}/images/breakfast.jpeg`,
        },
        {
          time: "10:00 AM Onwards",
          title: "Mayra",
          venue: "Lawn 1",
          image: `${process.env.PUBLIC_URL}/images/mayra.jpeg`,
        },
        {
          time: "4:30 PM Onwards",
          title: "Hi-Tea",
          venue: "Banquet Hall",
          image: `${process.env.PUBLIC_URL}/images/hitea.jpeg`,
        },
        {
          time: "5:00 PM Onwards",
          title: "Ghurcharai",
          venue: "Cottage Lawn",
          image: `${process.env.PUBLIC_URL}/images/ghurcharai.jpeg`,
        },
        {
          time: "7:00 PM Onwards",
          title: "Reception",
          venue: "Lawn 2",
          image: `${process.env.PUBLIC_URL}/images/reception.jpeg`,
        },
        {
          time: "11:00 PM Onwards",
          title: "Phere",
          venue: "Lawn 1",
          image: `${process.env.PUBLIC_URL}/images/phera.jpeg`,
        },
      ],
    },
  ];

  return (
    <section className="bg-[#fffaf2] py-24">
      <h2 className="text-4xl md:text-4xl text-center text-[#c19a6b] font-vibes mb-20">
        Wedding Itinerary
      </h2>

      {events.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className="relative max-w-6xl mx-auto px-10 mb-32"
        >
          {/* DATE */}
          <div className="day-separator">
            <span>{day.date}</span>
          </div>

          {/* ONE CONTINUOUS CENTER LINE */}
          <div className="hidden md:block absolute left-1/2 top-[140px] bottom-[60px]
            w-[2px] -translate-x-1/2 bg-[#e0c9a6]" />

          <div className="space-y-24">
            {day.items.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* ================= DESKTOP ================= */}
                  <div className="hidden md:grid grid-cols-[1fr_40px_1fr] items-center">
                    {/* LEFT */}
                    <div className="flex justify-end pr-16">
                      {isLeft && (
                        <div className="timeline-card flex items-center gap-4 text-right">
                          <div className="flex-1">
                            <h4 className="timeline-title">{item.title}</h4>
                            <span className="time-badge mt-2">{item.time}</span>
                            <div className="venue-label justify-end">
                              <span>{item.venue}</span>
                            </div>
                          </div>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="timeline-icon"
                          />
                        </div>
                      )}
                    </div>

                    {/* CENTER DOT */}
                    <div className="flex justify-center">
                      <span className="timeline-dot relative z-10" />
                    </div>

                    {/* RIGHT */}
                    <div className="flex justify-start pl-16">
                      {!isLeft && (
                        <div className="timeline-card flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="timeline-icon"
                          />
                          <div className="flex-1">
                            <h4 className="timeline-title">{item.title}</h4>
                            <span className="time-badge mt-2">{item.time}</span>
                            <div className="venue-label">
                              <span>{item.venue}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ================= MOBILE ================= */}
                  <div className="md:hidden flex flex-col items-center">
                    <span className="timeline-dot mb-4" />
                    <div className="timeline-card w-full text-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="timeline-icon mx-auto mb-2"
                      />
                      <h4 className="timeline-title">{item.title}</h4>
                      <span className="time-badge mt-2">{item.time}</span>
                      <div className="venue-label justify-center mt-2">
                        <span>{item.venue}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Itinerary;
