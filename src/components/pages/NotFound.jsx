import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
          <ApperIcon name="ShoppingBag" size={32} className="text-white" />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl font-bold text-secondary">404</h1>
          <h2 className="text-2xl font-semibold text-secondary">Page Not Found</h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" className="flex items-center">
              <ApperIcon name="Home" size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" className="flex items-center">
              <ApperIcon name="ShoppingCart" size={16} className="mr-2" />
              View Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;