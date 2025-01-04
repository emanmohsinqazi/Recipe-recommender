export default function DeliveryBanner() {
  return (
    <div className="max-w-7xl mx-auto my-12">
      <div className="bg-primary rounded-2xl p-12 flex items-center justify-between">
        <div className="text-white">
          <h2 className="text-5xl font-bold mb-8">We Deliver your<br />Grocery in 24 Hours</h2>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-medium">
            Order Now
          </button>
        </div>
        <div>
          {/* <img src="/delivery-boy.png" alt="Delivery" className="h-64" /> */}
        </div>
      </div>
    </div>
  );
}