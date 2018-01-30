const toTitle = string => string[0].toUpperCase() + string.substring(1);

export default function(model) {
  const factory = { data: {} };

  Object.entries(model).forEach(([key, val]) => {
    const { type, defaultValue, validation } = val;
    if (defaultValue) {
      factory.data[key] = defaultValue;
    } else {
      factory.data[key] = null;
    }
    const getter = `get${toTitle(key)}`;
    const setter = `set${toTitle(key)}`;
    factory[getter] = function() {
      return this.data[key] || null;
    };
    factory[setter] = function(val) {
      if (validation && !validation(val)) {
        return new Error(`Validation failed for ${key}`);
      }
      this.data[key] = val;
      return this;
    };
  });

  return factory;
}
