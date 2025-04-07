module.exports = (err, req, res, next) => {
    console.error('🔴 Error:', err.stack);
    
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? '🥷 oculto en producción' : err.stack
    });
  };
  