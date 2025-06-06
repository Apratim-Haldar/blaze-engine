module.exports = {
  id: 'address',
  label: 'Address',
  description: 'A reusable entity representing a postal address',
  extends: 'blaze-entity',
  attributes: [
    { id: 'street',     type: 'string', label: 'Street',   required: true },
    { id: 'city',       type: 'string', label: 'City',     required: true },
    { 
      id: 'postalCode', type: 'string', label: 'Postal Code', required: true,
      validations: { pattern: '^[0-9]{4,6}[A-Za-z]?$', errorMessage: 'Invalid postal code' },
      indexed: true
    },
    { 
      id: 'country',    type: 'string', label: 'Country',
      defaultValue: 'Netherlands',
      allowedValues: ['Netherlands','US','UK','India']
    },
    {
      id: 'fullAddress',
      type: 'computed',
      label: 'Full Address',
      compute: e => `${e.street}, ${e.postalCode} ${e.city}, ${e.country}`,
      dependencies: ['street','city','postalCode','country']
    }
  ]
};