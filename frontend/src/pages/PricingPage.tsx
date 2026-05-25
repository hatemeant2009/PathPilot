import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { subscriptionService } from '../services/api';
import { FiCheck, FiZap } from 'react-icons/fi';

interface Plan {
  name: string;
  price: number;
  cycle: string;
  yearlyPrice?: number;
  features: string[];
}

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [upgrading, setUpgrading] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await subscriptionService.getPlans();
        setPlans(response.data.plans);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleUpgrade = async (planName: string) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      setUpgrading(planName);
      await subscriptionService.upgrade(userId, planName);
      navigate('/dashboard');
    } catch (err: any) {
      alert('Error upgrading plan');
      setUpgrading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  const planColors: any = {
    Free: 'border-gray-300 hover:shadow-lg',
    Pro: 'border-blue-500 shadow-xl transform scale-105 ring-2 ring-blue-200',
    Premium: 'border-purple-500 shadow-xl ring-2 ring-purple-200'
  };

  const planIcons: any = {
    Free: '📍',
    Pro: '⭐',
    Premium: '🏆'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">Choose the perfect plan for your growth journey</p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-lg font-semibold transition relative ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200'
              }`}
            >
              Yearly Billing
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-full transform translate-x-2 -translate-y-2">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan: Plan, index: number) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 border-2 transition transform hover:-translate-y-2 ${planColors[plan.name as keyof typeof planColors]}`}
            >
              {/* Plan Header */}
              <div className="mb-8">
                <div className="text-4xl mb-2">{planIcons[plan.name]}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price === 0 ? 'Free' : plan.price}
                  </span>
                  {plan.price > 0 && <span className="text-gray-600">/month</span>}
                </div>
                {plan.yearlyPrice && plan.price > 0 && (
                  <p className="text-sm text-gray-600">or ${plan.yearlyPrice}/year (save 20%)</p>
                )}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleUpgrade(plan.name)}
                disabled={upgrading === plan.name}
                className={`w-full py-3 rounded-lg font-bold mb-8 transition ${
                  plan.name === 'Free'
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                } ${upgrading === plan.name ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {upgrading === plan.name ? 'Upgrading...' : plan.name === 'Free' ? 'Get Started' : `Upgrade to ${plan.name}`}
              </button>

              {/* Features List */}
              <ul className="space-y-3">
                {plan.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheck className="text-green-500 flex-shrink-0 mt-1 font-bold" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: 'Can I change plans anytime?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Our Free plan is forever free with full access to the quiz, basic recommendations, and daily tasks.'
              },
              {
                question: 'What if I want to cancel?',
                answer: 'You can cancel your subscription anytime with one click. No questions asked, no penalties.'
              },
              {
                question: 'Do you offer refunds?',
                answer: 'We offer a 30-day money-back guarantee for annual subscriptions if you\'re not satisfied.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, debit cards, and digital payment methods through Stripe.'
              },
              {
                question: 'Can I upgrade from Free to Premium directly?',
                answer: 'Absolutely! You can upgrade directly to any plan from the Free plan.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h3 className="font-bold text-lg text-gray-900 mb-2 flex items-center gap-2">
                  <FiZap className="text-blue-600" />
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Money Back Guarantee */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-2">
              <span className="text-3xl">✅</span>
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">30-Day Money Back Guarantee</h3>
            <p className="text-gray-600">
              We're confident you'll love PathPilot. If you're not satisfied within 30 days, we'll refund you 100%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
