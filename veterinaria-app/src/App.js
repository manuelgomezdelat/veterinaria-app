// src/App.js
import React, { useState } from 'react';
import { Package, AlertCircle, FileText, User, Home, Search, ChevronRight, Calendar, Clock, Check, ArrowLeft } from 'lucide-react';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [consumptionData, setConsumptionData] = useState({
    quantity: '',
    unit: 'unidades',
    patient: '',
    notes: ''
  });
  const [bajaData, setBajaData] = useState({
    quantity: '',
    reason: '',
    notes: ''
  });

  const userName = "Dr. Juan Pérez";
  const currentDate = new Date().toLocaleDateString('es-EC', { 
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  });

  const products = [
    { id: 1, name: 'Amoxicilina 500mg', stock: 150, unit: 'tabletas', lote: 'L2024-001' },
    { id: 2, name: 'Suero Fisiológico', stock: 45, unit: 'ml', lote: 'L2024-032' },
    { id: 3, name: 'Jeringa 10ml', stock: 200, unit: 'unidades', lote: 'L2024-015' },
    { id: 4, name: 'Antiparasitario Canino', stock: 80, unit: 'ml', lote: 'L2024-009' },
    { id: 5, name: 'Vitamina B12', stock: 30, unit: 'ml', lote: 'L2024-045' }
  ];

  const recentRegisters = [
    { id: 1, product: 'Amoxicilina 500mg', quantity: '2 tabletas', patient: 'Max - Canino', date: '15/12/2025', time: '10:30' },
    { id: 2, product: 'Suero Fisiológico', quantity: '250 ml', patient: 'Luna - Felino', date: '15/12/2025', time: '11:15' },
    { id: 3, product: 'Jeringa 10ml', quantity: '3 unidades', patient: 'Rocky - Canino', date: '15/12/2025', time: '12:00' },
    { id: 4, product: 'Antiparasitario', quantity: '5 ml', patient: 'Michi - Felino', date: '14/12/2025', time: '16:45' }
  ];

  const reasons = [
    'Producto Vencido',
    'Daño/Rotura',
    'Contaminación',
    'Error de Dispensación',
    'Otro'
  ];

  const DashboardScreen = () => (
    <div className="screen">
      <div className="header">
        <div className="header-content">
          <div>
            <h1 className="header-title">Área Médica</h1>
            <p className="header-subtitle">Gestión de Inventario</p>
          </div>
          <div className="avatar">
            {userName.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card stat-blue">
          <div className="stat-content">
            <div>
              <p className="stat-value">12</p>
              <p className="stat-label">Consumos Registrados</p>
            </div>
            <div className="stat-icon stat-icon-blue">
              <Package className="icon-lg" />
            </div>
          </div>
        </div>

        <div className="stat-card stat-orange">
          <div className="stat-content">
            <div>
              <p className="stat-value">2</p>
              <p className="stat-label">Bajas Pendientes</p>
            </div>
            <div className="stat-icon stat-icon-orange">
              <AlertCircle className="icon-lg" />
            </div>
          </div>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-content">
            <div>
              <p className="stat-value">8</p>
              <p className="stat-label">Productos Diferentes</p>
            </div>
            <div className="stat-icon stat-icon-green">
              <FileText className="icon-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="actions-container">
        <h2 className="section-title">Acciones Rápidas</h2>
        
        <button 
          onClick={() => setCurrentScreen('consumo-search')}
          className="action-button action-button-primary"
        >
          <div className="action-content">
            <div className="action-icon action-icon-blue">
              <Package className="icon-md" />
            </div>
            <div className="action-text">
              <p className="action-title">Registrar Consumo</p>
              <p className="action-subtitle">Registrar uso de productos</p>
            </div>
          </div>
          <span className="action-badge">Iniciar</span>
        </button>

        <button 
          onClick={() => setCurrentScreen('baja-search')}
          className="action-button action-button-secondary"
        >
          <div className="action-content">
            <div className="action-icon action-icon-orange">
              <AlertCircle className="icon-md" />
            </div>
            <div className="action-text">
              <p className="action-title">Reportar Baja</p>
              <p className="action-subtitle">Reportar daños o mermas</p>
            </div>
          </div>
          <span className="action-badge action-badge-orange">Iniciar</span>
        </button>
      </div>

      <div className="bottom-nav">
        <button className="nav-item nav-item-active">
          <Home className="icon-md" />
          <span className="nav-label">Inicio</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('consumo-search')}
          className="nav-item"
        >
          <Package className="icon-md" />
          <span className="nav-label">Consumos</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('registros')}
          className="nav-item"
        >
          <FileText className="icon-md" />
          <span className="nav-label">Registros</span>
        </button>
        <button className="nav-item">
          <User className="icon-md" />
          <span className="nav-label">Perfil</span>
        </button>
      </div>
    </div>
  );

  const ConsumoSearchScreen = () => (
    <div className="screen">
      <div className="header header-blue">
        <div className="header-content">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft className="icon-md" />
          </button>
          <div>
            <h1 className="header-title-white">Registrar Consumo</h1>
            <p className="header-subtitle-white">Buscar producto</p>
          </div>
        </div>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar producto..."
            className="search-input search-input-blue"
          />
        </div>
      </div>

      <div className="content-scroll">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setCurrentScreen('consumo-form');
            }}
            className="product-card"
          >
            <div className="product-content">
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-detail">Lote: {product.lote}</p>
                <p className="product-stock">Stock: {product.stock} {product.unit}</p>
              </div>
              <ChevronRight className="icon-md icon-gray" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const ConsumoFormScreen = () => (
    <div className="screen">
      <div className="header header-blue">
        <div className="header-content">
          <button onClick={() => setCurrentScreen('consumo-search')} className="back-button">
            <ArrowLeft className="icon-md" />
          </button>
          <div>
            <h1 className="header-title-white">Registrar Consumo</h1>
            <p className="header-subtitle-white">Detalles del consumo</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        <div className="info-card info-card-blue">
          <p className="info-label">Producto Seleccionado</p>
          <p className="info-title">{selectedProduct?.name}</p>
          <p className="info-detail">Lote: {selectedProduct?.lote}</p>
          <p className="info-stock">Stock disponible: {selectedProduct?.stock} {selectedProduct?.unit}</p>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label className="form-label">Cantidad Consumida *</label>
            <div className="input-row">
              <input
                type="number"
                placeholder="0"
                className="form-input"
                value={consumptionData.quantity}
                onChange={(e) => setConsumptionData({...consumptionData, quantity: e.target.value})}
              />
              <select
                className="form-select"
                value={consumptionData.unit}
                onChange={(e) => setConsumptionData({...consumptionData, unit: e.target.value})}
              >
                <option>unidades</option>
                <option>ml</option>
                <option>tabletas</option>
                <option>gramos</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Paciente (Opcional)</label>
            <input
              type="text"
              placeholder="Ej: Max - Canino"
              className="form-input"
              value={consumptionData.patient}
              onChange={(e) => setConsumptionData({...consumptionData, patient: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notas Adicionales</label>
            <textarea
              placeholder="Observaciones sobre el consumo..."
              rows="3"
              className="form-textarea"
              value={consumptionData.notes}
              onChange={(e) => setConsumptionData({...consumptionData, notes: e.target.value})}
            />
          </div>

          <div className="summary-card">
            <div className="summary-row">
              <span className="summary-label">Fecha:</span>
              <span className="summary-value">{currentDate}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Registrado por:</span>
              <span className="summary-value">{userName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button
          onClick={() => setCurrentScreen('consumo-confirmacion')}
          className="btn-primary btn-blue"
        >
          Registrar Consumo
        </button>
      </div>
    </div>
  );

  const ConsumoConfirmacionScreen = () => (
    <div className="screen screen-center">
      <div className="confirmation-card">
        <div className="confirmation-icon confirmation-icon-success">
          <Check className="icon-xl" />
        </div>
        <h2 className="confirmation-title">¡Consumo Registrado!</h2>
        <p className="confirmation-text">El consumo ha sido registrado exitosamente en el sistema.</p>
        
        <div className="confirmation-summary">
          <p className="summary-header">Resumen:</p>
          <p className="summary-product">{selectedProduct?.name}</p>
          <p className="summary-detail">Cantidad: {consumptionData.quantity} {consumptionData.unit}</p>
          {consumptionData.patient && (
            <p className="summary-detail">Paciente: {consumptionData.patient}</p>
          )}
        </div>

        <button
          onClick={() => {
            setConsumptionData({quantity: '', unit: 'unidades', patient: '', notes: ''});
            setSelectedProduct(null);
            setCurrentScreen('dashboard');
          }}
          className="btn-primary btn-blue"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  const BajaSearchScreen = () => (
    <div className="screen">
      <div className="header header-orange">
        <div className="header-content">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft className="icon-md" />
          </button>
          <div>
            <h1 className="header-title-white">Reportar Baja/Ajuste</h1>
            <p className="header-subtitle-white">Buscar producto</p>
          </div>
        </div>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar producto..."
            className="search-input search-input-orange"
          />
        </div>
      </div>

      <div className="content-scroll">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setCurrentScreen('baja-form');
            }}
            className="product-card"
          >
            <div className="product-content">
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <p className="product-detail">Lote: {product.lote}</p>
                <p className="product-stock">Stock: {product.stock} {product.unit}</p>
              </div>
              <ChevronRight className="icon-md icon-gray" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const BajaFormScreen = () => (
    <div className="screen">
      <div className="header header-orange">
        <div className="header-content">
          <button onClick={() => setCurrentScreen('baja-search')} className="back-button">
            <ArrowLeft className="icon-md" />
          </button>
          <div>
            <h1 className="header-title-white">Reportar Baja/Ajuste</h1>
            <p className="header-subtitle-white">Detalles de la baja</p>
          </div>
        </div>
      </div>

      <div className="form-container">
        <div className="info-card info-card-orange">
          <p className="info-label">Producto Seleccionado</p>
          <p className="info-title">{selectedProduct?.name}</p>
          <p className="info-detail">Lote: {selectedProduct?.lote}</p>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label className="form-label">Cantidad Afectada *</label>
            <div className="input-row">
              <input
                type="number"
                placeholder="0"
                className="form-input"
                value={bajaData.quantity}
                onChange={(e) => setBajaData({...bajaData, quantity: e.target.value})}
              />
              <span className="input-unit">
                {selectedProduct?.unit}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Motivo de Baja *</label>
            <select
              className="form-select form-select-full"
              value={bajaData.reason}
              onChange={(e) => setBajaData({...bajaData, reason: e.target.value})}
            >
              <option value="">Seleccionar motivo...</option>
              {reasons.map((reason, idx) => (
                <option key={idx} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Descripción Detallada *</label>
            <textarea
              placeholder="Describe el motivo de la baja..."
              rows="4"
              className="form-textarea"
              value={bajaData.notes}
              onChange={(e) => setBajaData({...bajaData, notes: e.target.value})}
            />
          </div>

          <div className="alert-card">
            <AlertCircle className="alert-icon" />
            <p className="alert-text">
              Esta solicitud será revisada y aprobada por el Administrador antes de ajustar el inventario.
            </p>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button
          onClick={() => setCurrentScreen('baja-confirmacion')}
          className="btn-primary btn-orange"
        >
          Enviar Solicitud
        </button>
      </div>
    </div>
  );

  const BajaConfirmacionScreen = () => (
    <div className="screen screen-center">
      <div className="confirmation-card">
        <div className="confirmation-icon confirmation-icon-orange">
          <Check className="icon-xl" />
        </div>
        <h2 className="confirmation-title">Solicitud Enviada</h2>
        <p className="confirmation-text">La solicitud de baja ha sido enviada para aprobación del Administrador.</p>
        
        <div className="confirmation-summary">
          <p className="summary-header">Resumen:</p>
          <p className="summary-product">{selectedProduct?.name}</p>
          <p className="summary-detail">Cantidad: {bajaData.quantity} {selectedProduct?.unit}</p>
          <p className="summary-detail">Motivo: {bajaData.reason}</p>
        </div>

        <div className="notification-card">
          <p className="notification-text">
            Recibirás una notificación cuando la solicitud sea revisada.
          </p>
        </div>

        <button
          onClick={() => {
            setBajaData({quantity: '', reason: '', notes: ''});
            setSelectedProduct(null);
            setCurrentScreen('dashboard');
          }}
          className="btn-primary btn-orange"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  const RegistrosScreen = () => (
    <div className="screen">
      <div className="header header-green">
        <div className="header-content">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft className="icon-md" />
          </button>
          <div>
            <h1 className="header-title-white">Mis Registros</h1>
            <p className="header-subtitle-white">Historial de consumos</p>
          </div>
        </div>
        
        <div className="filter-buttons">
          <button className="filter-btn filter-btn-active">Hoy</button>
          <button className="filter-btn">Semana</button>
          <button className="filter-btn">Mes</button>
        </div>
      </div>

      <div className="content-scroll">
        {recentRegisters.map(register => (
          <div key={register.id} className="register-card">
            <div className="register-header">
              <div className="register-info">
                <p className="register-product">{register.product}</p>
                <p className="register-patient">{register.patient}</p>
              </div>
              <div className="register-quantity">
                <p className="quantity-text">{register.quantity}</p>
              </div>
            </div>
            <div className="register-footer">
              <div className="register-meta">
                <Calendar className="icon-sm" />
                <span>{register.date}</span>
              </div>
              <div className="register-meta">
                <Clock className="icon-sm" />
                <span>{register.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="form-footer">
        <button className="btn-secondary btn-green">
          Ver Más Registros
        </button>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch(currentScreen) {
      case 'dashboard': return <DashboardScreen />;
      case 'consumo-search': return <ConsumoSearchScreen />;
      case 'consumo-form': return <ConsumoFormScreen />;
      case 'consumo-confirmacion': return <ConsumoConfirmacionScreen />;
      case 'baja-search': return <BajaSearchScreen />;
      case 'baja-form': return <BajaFormScreen />;
      case 'baja-confirmacion': return <BajaConfirmacionScreen />;
      case 'registros': return <RegistrosScreen />;
      default: return <DashboardScreen />;
    }
  };

  return renderScreen();
}

export default App;