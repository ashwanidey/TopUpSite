import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="mt-[6rem] lg:mx-[6rem] mx-[1rem] flex flex-col gap-3 text-white">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>
        At Gammerce, we prioritize your privacy and strive to protect the personal 
        information you share with us. This Privacy Policy outlines the types of 
        information we collect and how it is used and shared.
      </p>
      <p>
        By using our services and website, you agree to the terms outlined in this policy. 
        If you do not agree with any part of this policy, please refrain from using our services.
      </p>
      
      <h2 className="text-xl font-semibold">1. Information We Collect</h2>
      <ul className="list-disc pl-5">
        <li><strong>Personal Information:</strong> When you use our services, make purchases, 
          or contact support, we may collect personally identifiable information such as your 
          name, email, phone number, and payment details. This information is collected via 
          secure forms on our website.
        </li>
        <li><strong>Non-Personal Information:</strong> We may collect non-personal data like 
          browser type, IP address, and general usage data to improve your experience. This 
          information helps us analyze trends and optimize our services.
        </li>
        <li><strong>Cookies:</strong> Like many websites, we use cookies to enhance your 
          experience. Cookies help us track how often you visit our site and allow us to provide 
          personalized content. You can manage cookie preferences through your browser settings.
        </li>
      </ul>

      <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
      <ul className="list-disc pl-5">
        <li><strong>Providing Services:</strong> We use your personal information to fulfill 
          orders, respond to inquiries, and ensure seamless transactions.
        </li>
        <li><strong>Improving Our Services:</strong> Non-personal data helps us improve user 
          experience by analyzing site performance, understanding customer demographics, and 
          identifying areas for improvement.
        </li>
        <li><strong>Communications:</strong> Your email and phone number may be used to send 
          you notifications related to transactions, updates, and offers. You can opt out of 
          promotional communications at any time.
        </li>
      </ul>
      
      <h2 className="text-xl font-semibold">3. Sharing Information with Third Parties</h2>
      <p>
        We do not share your personal information with third parties unless necessary to 
        fulfill a service request, comply with legal obligations, or with your explicit 
        consent. Any non-personal data used for statistical purposes is anonymized and does 
        not include identifiable information.
      </p>
      
      <h2 className="text-xl font-semibold">4. Security of Your Information</h2>
      <p>
        We take data security seriously. All sensitive transactions are processed through 
        secure servers, and we do not store any financial details such as credit card numbers. 
        However, no method of online transmission or storage is entirely foolproof, and we 
        cannot guarantee absolute security.
      </p>
      
      <h2 className="text-xl font-semibold">5. Updating or Removing Your Information</h2>
      <p>
        You have the right to access, update, or delete your personal information stored by us. 
        If you need to correct or remove your data, please contact our support team at <nbsp/>
        <a href="mailto:gammerce.in@gmail.com" className="text-blue-500 underline">
          gammerce.in@gmail.com
        </a>. We may require proof of identity to process such requests.
      </p>
      
      <h2 className="text-xl font-semibold">6. Changes to the Privacy Policy</h2>
      <p>
        We reserve the right to modify this policy at any time. Any changes will be posted 
        on this page. We recommend reviewing the policy periodically to stay informed about 
        how we protect your data.
      </p>
      
      <p>
        For any questions or concerns, feel free to contact us at <nbsp/>
        <a href="mailto:gammerce.in@gmail.com" className="text-blue-500 underline">
          gammerce.in@gmail.com
        </a>.
      </p>
    </div>
  );
};

export default PrivacyPage;
