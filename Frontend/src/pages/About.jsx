import React from 'react';
import Title from '../components/Title';
import { asset } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* About Us Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 md:gap-16 items-center">
        <img
          src={asset.image}
          alt="About Us"
          className="w-full md:max-w-[450px] rounded-md shadow-md"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            assumenda facere? Consequatur deserunt quod iure voluptas omnis qui
            similique eveniet placeat consequuntur aspernatur tenetur, itaque
            enim blanditiis debitis fugiat. Sint eius ad corporis? Expedita
            corrupti, ipsum quod hic recusandae maxime quae quos rerum,
            voluptate cum incidunt facilis molestias sint quam!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            voluptas iste, fuga, accusantium, expedita ut qui inventore dicta
            tempora sit incidunt impedit! Optio veniam voluptatem ipsam ad porro
            architecto sapiente in, minima tempore dolore modi. Dignissimos
            tenetur a quae ullam?
          </p>
          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
            mollitia magnam doloribus sed culpa possimus, impedit optio atque,
            tempora enim distinctio nisi repudiandae? Ex tempora qui aspernatur
            aperiam officiis repellendus.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 text-sm mt-6 mb-20">
          <div className="text-gray-600 border px-8 py-10 md:py-16 flex flex-col gap-5 items-center text-center rounded-md shadow-md">
            <b className="text-lg text-gray-800">Quality Assurance</b>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
              tempora vero quia velit quis dolores, non tenetur? Sed, omnis
              nobis.
            </p>
          </div>
          <div className="text-gray-600 border px-8 py-10 md:py-16 flex flex-col gap-5 items-center text-center rounded-md shadow-md">
            <b className="text-lg text-gray-800">Convenience</b>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
              tempora vero quia velit quis dolores, non tenetur? Sed, omnis
              nobis.
            </p>
          </div>
          <div className="text-gray-600 border px-8 py-10 md:py-16 flex flex-col gap-5 items-center text-center rounded-md shadow-md">
            <b className="text-lg text-gray-800">Exceptional Customer Care</b>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
              tempora vero quia velit quis dolores, non tenetur? Sed, omnis
              nobis.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default About;
