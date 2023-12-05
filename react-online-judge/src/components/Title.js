import React from 'react';

export default function Title() {
  return (
    <section className="py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
      <div className="container px-4 md:px-6">
        <div className="row gap-6 align-items-center">
          <div className="col-12 col-md-8 mx-auto text-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="display-3 font-weight-bold text-white">
                  React-Online-Judge
                </h1>
                <p className="max-w-700 text-secondary h5">
                  This is a web application that provides a coding test environment.
                </p>
              </div>
              <div className="w-100 max-w-full space-y-2">
                <div className="row gap-6">
                  <div className="col-12 col-md-4">
                    <div className="flex flex-column space-y-2">
                      <h2 className="h4 font-weight-bold text-white">Feature 1</h2>
                      <p className="text-secondary">어쩌고 저쩌고</p>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="flex flex-column space-y-2">
                      <h2 className="h4 font-weight-bold text-white">Feature 2</h2>
                      <p className="text-secondary">어쩌고 저쩌고 2</p>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="flex flex-column space-y-2">
                      <h2 className="h4 font-weight-bold text-white">Feature 3</h2>
                      <p className="text-secondary">어쩌고 저쩌고 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
