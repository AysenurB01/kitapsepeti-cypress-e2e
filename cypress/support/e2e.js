// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Bu hata, Google'ın izleme kodundan kaynaklanıyor
  // ve testi etkilemiyor, bu yüzden görmezden gelebiliriz.
  if (err.message.includes('google_trackConversion')) {
    return false;
  }
  // Diğer hatalar için Cypress'in varsayılan davranışına izin ver
  return true;
});

import 'cypress-real-events/support';


