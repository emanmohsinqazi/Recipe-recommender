/* eslint-disable react/prop-types */
export default function BannerSlide({ banner }) {
  // eslint-disable-next-line no-unused-vars
  const { title, subtitle, description, website, logoSrc, imageSrc, bgColor } = banner;

  return (
    <div className={`relative ${bgColor} rounded-2xl overflow-hidden`}>
      <div className="flex items-center justify-between p-12">
        <div className="text-white max-w-lg">
          {/* <img src={logoSrc} alt="Rasa Supermarket" className="mb-6 w-48" /> */}
          <h2 className="text-5xl font-bold mb-4">{title}</h2>
          <p className="text-4xl font-bold mb-2">{subtitle}</p>
          <p className="mb-6">{description}</p>
          <p className="text-lg">{website}</p>
        </div>
        <div className="flex-1 flex justify-center">
          {/* <img src={imageSrc} alt="Banner" className="w-96" /> */}
        </div>
      </div>
    </div>
  );
}