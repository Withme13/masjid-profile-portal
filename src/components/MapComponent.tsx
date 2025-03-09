
import React from 'react';

interface MapComponentProps {
  address: string;
}

const MapComponent = ({ address }: MapComponentProps) => {
  // Create URL-friendly address
  const encodedAddress = encodeURIComponent(address);
  
  // Google Maps embed URL with the encoded address
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.093243908937!2d106.87926567498945!3d-6.118149693868473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1fc6a67eb9f9%3A0xa6fb471d71db11a6!2sJl.%20Ganggeng%20VII%20No.2%2C%20RT.4%2FRW.7%2C%20Sungai%20Bambu%2C%20Kec.%20Tj.%20Priok%2C%20Jkt%20Utara%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2014330!5e0!3m2!1sen!2sid!4v1740910488580!5m2!1sen!2sid`;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <iframe 
        src={mapUrl}
        className="w-full h-[400px]"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Al-Hikma Mosque Location"
        aria-label="Map showing the location of Al-Hikma Mosque"
      />
    </div>
  );
};

export default MapComponent;
