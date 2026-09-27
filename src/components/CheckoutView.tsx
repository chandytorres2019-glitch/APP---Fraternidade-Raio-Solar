import React, { useState } from 'react';
import { getLocalizedPlans } from '../i18n/localizedSpiritualData';
import { SubscriptionPlan, UserProfile } from '../types';
import { useAppConfig } from '../context/AppContext';
import { 
  Check, 
  Crown, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  FileText, 
  Tag, 
  Lock, 
  CheckCircle2, 
  Copy
} from 'lucide-react';

interface CheckoutViewProps {
  user: UserProfile | null;
  onUpgradePlan: (planId: 'free' | 'raio_solar' | 'ascensionado') => void;
  onSuccessNotice: (msg: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  user,
  onUpgradePlan,
  onSuccessNotice,
}) => {
  const { t, language } = useAppConfig();
  const plans = getLocalizedPlans(language);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plano_completo');
  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[1];
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states for credit card
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(user?.name || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleApplyCoupon = () => {
    const cleanCoupon = coupon.trim().toUpperCase();
    if (cleanCoupon === 'LUZ21' || cleanCoupon === 'MARTHA' || cleanCoupon === 'SAINTGERMAIN') {
      setDiscountApplied(true);
    }
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const planCode = selectedPlan.id === 'plano_vitalicio' ? 'ascensionado' : 'raio_solar';
      onUpgradePlan(planCode);
      onSuccessNotice(t.plans.successDesc);
    }, 1500);
  };

  const mockPixPayload = "00020126580014br.gov.bcb.pix0136fraternidaderaiosolar@pix.martha.com5204000053039865405238.805802BR5925FRATERNIDADE RAIO SOLAR6009SAO PAULO62070503***6304E8A2";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixPayload);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  return (
    <div id="checkout-view-container" className="space-y-10 pb-16">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.plans.badge}</span>
        </div>
        <h1 className="font-['Cinzel'] text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400">
          {t.plans.title}
        </h1>
        <p className="text-sm text-slate-300">
          {t.plans.description}
        </p>
      </div>

      {/* Plans Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`relative cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-950/80 via-slate-900 to-slate-950 border-amber-400 shadow-2xl shadow-purple-950/70 scale-102 ring-2 ring-amber-400/40'
                  : 'bg-slate-900/60 border-purple-900/30 hover:border-purple-600/50 hover:bg-slate-900/90'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-md">
                  {t.plans.popularTag}
                </div>
              )}

              <div className="space-y-4">
                <div className="pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    {plan.popular ? t.plans.popularTag : (plan.id === 'plano_vitalicio' ? t.plans.lifetimeTag : t.plans.freePlan)}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-purple-900/30">
                  {plan.originalPrice && (
                    <span className="text-xs text-slate-400 line-through mr-2">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-['Cinzel']">
                    {discountApplied ? '20% OFF' : plan.price}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">
                    {plan.period}
                  </span>
                </div>

                <div className="space-y-2.5 pt-4">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {isSelected ? `${t.common.confirm} ✓` : t.plans.title}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Checkout Terminal */}
      <div 
        id="checkout-terminal"
        className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-purple-800/40 p-6 sm:p-8 shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-purple-900/30">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              {selectedPlan.name}
            </h3>
            <p className="text-xs text-slate-400">
              {t.plans.immediateAccess}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-amber-300 font-mono">
              {selectedPlan.price}
            </div>
            <div className="text-[11px] text-purple-300">
              {selectedPlan.period}
            </div>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="grid grid-cols-3 gap-3">
          <button
            id="pay-pix-btn"
            type="button"
            onClick={() => setPaymentMethod('pix')}
            className={`p-3 rounded-2xl border text-center transition-all ${
              paymentMethod === 'pix'
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
            <span className="text-xs font-bold block">{t.plans.paymentPix}</span>
          </button>

          <button
            id="pay-cc-btn"
            type="button"
            onClick={() => setPaymentMethod('credit_card')}
            className={`p-3 rounded-2xl border text-center transition-all ${
              paymentMethod === 'credit_card'
                ? 'bg-blue-950/40 border-blue-500 text-blue-300 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-400" />
            <span className="text-xs font-bold block">{t.plans.paymentCard}</span>
          </button>

          <button
            id="pay-boleto-btn"
            type="button"
            onClick={() => setPaymentMethod('boleto')}
            className={`p-3 rounded-2xl border text-center transition-all ${
              paymentMethod === 'boleto'
                ? 'bg-purple-950/40 border-purple-500 text-purple-300 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5 mx-auto mb-1 text-purple-400" />
            <span className="text-xs font-bold block">{t.plans.paymentBoleto}</span>
          </button>
        </div>

        {/* Coupon input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
            <input
              id="coupon-input"
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder={t.plans.couponPlaceholder}
              className="w-full bg-slate-950 border border-purple-900/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-amber-400"
            />
          </div>
          <button
            id="apply-coupon-btn"
            type="button"
            onClick={handleApplyCoupon}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-900/70 text-purple-200 hover:bg-purple-800 transition-colors"
          >
            {t.plans.couponApply}
          </button>
        </div>

        {discountApplied && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.plans.couponApplied}</span>
          </div>
        )}

        {/* PIX Method Details */}
        {paymentMethod === 'pix' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <QrCode className="w-4 h-4" />
                {t.plans.paymentPix}
              </span>
              <span className="text-[11px] text-slate-400">
                30 min
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/80 p-4 rounded-xl">
              <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <div className="grid grid-cols-6 gap-1 w-full h-full bg-slate-950 p-1 rounded">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`${(i % 2 === 0 || i % 7 === 0) ? 'bg-white' : 'bg-transparent'} rounded-xs`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 flex-1 w-full">
                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 truncate flex-1">
                    {mockPixPayload}
                  </span>
                  <button
                    id="copy-pix-code-btn"
                    type="button"
                    onClick={handleCopyPix}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 flex-shrink-0"
                  >
                    {pixCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{pixCopied ? 'OK' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Credit Card Form */}
        {paymentMethod === 'credit_card' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.plans.cardNumber}
              </label>
              <input
                id="cc-number-input"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="0000 0000 0000 0000"
                className="w-full bg-slate-950 border border-purple-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t.plans.cardExpiry}
                </label>
                <input
                  id="cc-expiry-input"
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/AA"
                  className="w-full bg-slate-950 border border-purple-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {t.plans.cardCvv}
                </label>
                <input
                  id="cc-cvv-input"
                  type="password"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  placeholder="123"
                  className="w-full bg-slate-950 border border-purple-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.plans.cardHolder}
              </label>
              <input
                id="cc-name-input"
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Name"
                className="w-full bg-slate-950 border border-purple-900/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        )}

        {/* Boleto Notice */}
        {paymentMethod === 'boleto' && (
          <div className="p-4 rounded-xl bg-slate-950 border border-purple-900/30 text-xs text-slate-300 space-y-2">
            <p>
              {t.plans.paymentBoleto}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          id="confirm-payment-btn"
          type="button"
          disabled={isProcessing}
          onClick={handleConfirmPayment}
          className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <span>{t.plans.processing}</span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>{t.plans.subscribeNow}: {selectedPlan.name}</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.plans.guarantee7Days}</span>
        </div>
      </div>
    </div>
  );
};
