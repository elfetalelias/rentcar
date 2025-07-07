import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CarGrid } from './components/CarGrid';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { cars } from './data/cars';
import { cities } from './data/cities';
import { Car, City } from './types';
import './i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Set initial direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  // Update document title
  useEffect(() => {
    document.title = t('site_title');
  }, [t]);

  // Filter cars based on selected city
  useEffect(() => {
    if (selectedCity) {
      const filtered = cars.filter(car => car.cities.includes(selectedCity));
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [selectedCity]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleBookClick = (carId: string) => {
    const car = cars.find(c => c.id === carId);
    if (car) {
      setSelectedCar(car);
      setIsBookingModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedCar(null);
  };

  const selectedCityData = cities.find(city => city.id === selectedCity);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <HeroSection 
        selectedCity={selectedCity} 
        onCityChange={handleCityChange}
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedCity ? t(`cities.${selectedCity}`) : 'Premium Cars'}
          </h2>
          <p className="text-gray-600">
            {selectedCity 
              ? `${filteredCars.length} cars available in ${t(`cities.${selectedCity}`)}`
              : `${cars.length} premium cars available across Morocco`
            }
          </p>
        </div>
        
        <CarGrid 
          cars={filteredCars} 
          onBookClick={handleBookClick}
        />
      </main>

      <BookingModal
        car={selectedCar}
        city={selectedCityData || null}
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
      />
      
      <Footer />
    </div>
  );
}

export default App;