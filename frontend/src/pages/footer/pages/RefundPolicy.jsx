import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3 text-white">
      <h1 className="text-3xl font-bold">Refund and Cancellation Policy</h1>
      <p>
        At Gammerce, we aim to provide a seamless experience when purchasing digital content 
        or services. Please note the following policies regarding refunds and cancellations:
      </p>
      
      <h2 className="text-xl font-semibold">1. Non-Refundable Items</h2>
      <p>
        Due to the nature of our products, which include digital content such as game credits, 
        virtual items, and pre-paid gift cards, all sales are final. Once payment is processed 
        and the product is delivered, cancellations or refunds cannot be made.
      </p>
      
      <h2 className="text-xl font-semibold">2. Payment Issues</h2>
      <p>
        In the event that payment has been successfully made but the purchased items are not 
        delivered, customers are encouraged to contact our support team with the relevant 
        details, including the order number and proof of payment.
      </p>
      
      <h2 className="text-xl font-semibold">3. Support Contact</h2>
      <p>
        If you experience any issues with your purchase or have questions regarding your order, 
        please reach out to our support team at <nbsp/> 
        <a href="mailto:gammerce.in@gmail.com" className="text-blue-500 underline">
          gammerce.in@gmail.com
        </a>.
      </p>
      
      <p>
        For more information, please review our <a href="/terms-and-condition" className="text-blue-500 underline">Terms and Conditions</a>.
      </p>
    </div>
  );
};

export default RefundPolicy;
