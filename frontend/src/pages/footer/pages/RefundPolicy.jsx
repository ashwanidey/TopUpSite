import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3 text-white">
      <h1>Refund Policy</h1>

      <p>We offer refunds solely in cases where:</p>
      <ul>
        <li><strong>Incorrect Recharge:</strong> If a recharge or transaction fails due to incorrect details provided by the user (e.g., wrong gaming ID, server, or region), we will issue a refund upon verification.</li>
      </ul>

      <h2>Refund Process</h2>
      <p>To request a refund, please follow these steps:</p>
      <ul>
        <li><strong>Contact Support:</strong> Send an email to WhatsApp - +91 7085 742871 within 2 days of the failed transaction.</li>
        <li><strong>Provide Details:</strong> Include your order ID, the reason for the refund (incorrect details), and any supporting documentation if required.</li>
        <li><strong>Verification:</strong> Our support team will verify the details provided.</li>
        <li><strong>Refund Issuance:</strong> If your request is approved, we will process the refund Instantly.</li>
      </ul>

      <h2>Non-Refundable Situations</h2>
      <p>Refunds will not be issued in the following situations:</p>
      <ul>
        <li><strong>Successful Transactions:</strong> Transactions where the recharge or payment is successfully processed.</li>
      </ul>

      <h2>Contact Us</h2>
      <p>If you have any questions about our Refund Policy, please contact us at WhatsApp - +91 7085 742871 / +91 6009 359518.</p>
    </div>
  );
};

export default RefundPolicy;
