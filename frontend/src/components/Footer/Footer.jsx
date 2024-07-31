const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Shutterfly. All rights reserved. Developed with &hearts; by Renato Mission</p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;